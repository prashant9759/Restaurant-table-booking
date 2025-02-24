from flask import request
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, get_jwt

from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from passlib.hash import pbkdf2_sha256

from tables import Admin, Restaurant
from db import db
from schemas import AdminSchema, LoginSchema , RestaurantSchema # Use AdminSchema
from services.logout import logout_logic
from services.helper import *

blp = Blueprint("Admins", __name__, description="Operations on admins")

# Business Logic Functions

def check_admin_role():
    """Check if the JWT contains the 'admin' role."""
    claims = get_jwt()
    if claims.get("role") != "admin":
        abort(403, message="Access forbidden: Admin role required.")

# API Routes

@blp.route("/api/admins")
class AdminList(MethodView):
    @blp.arguments(AdminSchema)
    def post(self, admin_data):
        """Create a new admin and return the created admin with tokens."""
        return create_logic(admin_data, Admin, "admin")

    @jwt_required()
    def get(self):
        """Get the current admin using the token."""
        check_admin_role()  # Ensure only admins can access this
        admin_id = get_jwt_identity()
        return get_item_by_id_logic(admin_id, Admin, "admin")

    @jwt_required()
    @blp.arguments(AdminSchema)
    def put(self, admin_data):
        """Replace the current admin (PUT, idempotent)."""
        check_admin_role()
        admin_id = get_jwt_identity()
        return update_logic(admin_id, Admin, admin_data, "admin")

    @jwt_required()
    @blp.arguments(AdminSchema(partial=True))
    def patch(self, admin_data):
        """Update the current admin (PATCH, partial update)."""
        check_admin_role()
        admin_id = get_jwt_identity()
        return update_logic(admin_id, Admin, admin_data, "admin")

    @jwt_required()
    @blp.response(204)
    def delete(self):
        """Delete the current admin."""
        check_admin_role()
        admin_id = get_jwt_identity()
        return delete_logic(admin_id, Admin, "admin")

@blp.route("/api/admins/all")
class AllAdmins(MethodView):
    def get(self):
        """Get all admins without any authentication."""
        return get_all_item_logic(Admin, "admin")
    
@blp.route("/api/admins/restaurants")
class AdminList(MethodView):
    @jwt_required()
    @blp.arguments(RestaurantSchema)
    def post(self, data):
        """Create a new restaurant and return the created restaurant with tokens."""
        check_admin_role()
        admin_id = get_jwt_identity()
        address_field = manage_address_field(data)
        
        # Assuming data["cuisines"] is a list of cuisine names (strings)

        cuisine_names = data.pop("cuisines", [])

        # Fetch CuisineType instances matching the given names
        cuisine_instances = CuisineType.query.filter(CuisineType.name.in_(cuisine_names)).all()

        if len(cuisine_instances) != len(cuisine_names):
            missing = set(cuisine_names) - {c.name for c in cuisine_instances}
            raise ValueError(f"Invalid cuisines provided: {', '.join(missing)}")

        # Now create the restaurant with cuisine instances
        restaurant = Restaurant(
            admin_id=admin_id,
            **data,
            **address_field,
            cuisines=cuisine_instances  # Pass the actual model instances
        )

        db.session.add(restaurant)
        db.session.commit()


        try:
            db.session.add(restaurant)
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            abort(500, message=f"{e.orig}")
        except SQLAlchemyError as e:
            db.session.rollback()
            print("error",e)
            abort(500, message="An error occurred while creating the restaurant.")

        return {
            "restaurant": restaurant.to_dict(),
            "message": "Restaurant created successfully",
            "status": 201
        } , 201

@blp.route("/api/restaurants/<int:restaurant_id>")
class RestaurantSelf(MethodView):
    @jwt_required()
    def get(self, restaurant_id):
        """Get a specific restaurant if it belongs to the current admin."""
        check_admin_role()
        admin_id = get_jwt_identity()
        restaurant = Restaurant.query.get(restaurant_id)
        if str(restaurant.admin_id) != admin_id:
            abort(403, message="You do not have permission to access this restaurant.")

        return  {
            "restaurant": restaurant.to_dict(),
            "message": "Restaurant fetched successfully",
            "status": 200
        } , 200

    @jwt_required()
    @blp.arguments(RestaurantSchema)
    def put(self, restaurant_data, restaurant_id):
        """Replace the restaurant (PUT) if it belongs to the admin."""
        check_admin_role()
        admin_id = get_jwt_identity()

        restaurant = Restaurant.query.get(restaurant_id)
        if str(restaurant.admin_id) != admin_id:
            abort(403, message="You do not have permission to modify this restaurant.")

        return update_logic(restaurant_id, Restaurant, restaurant_data, "restaurant")

    @jwt_required()
    @blp.arguments(RestaurantSchema(partial=True))
    def patch(self, restaurant_data, restaurant_id):
        """Partially update the restaurant (PATCH) if it belongs to the admin."""
        check_admin_role()
        admin_id = get_jwt_identity()

        restaurant = Restaurant.query.get(restaurant_id)
        if str(restaurant.admin_id) != admin_id:
            abort(403, message="You do not have permission to modify this restaurant.")

        return update_logic(restaurant_id, Restaurant, restaurant_data, "restaurant")

    @jwt_required()
    @blp.response(204)
    def delete(self, restaurant_id):
        """Delete the restaurant if it belongs to the admin."""
        check_admin_role()
        admin_id = get_jwt_identity()

        restaurant = Restaurant.query.get(restaurant_id)
        if str(restaurant.admin_id) != admin_id:
            abort(403, message="You do not have permission to delete this restaurant.")

        return delete_logic(restaurant_id, Restaurant, "restaurant")


@blp.route("/api/restaurants/all")
class AllRestaurants(MethodView):
    @jwt_required()
    def get(self):
        """Get all restaurants managed by the current admin."""
        check_admin_role()
        admin_id = get_jwt_identity()

        # Fetch all restaurants belonging to this admin
        restaurants = Restaurant.query.filter_by(admin_id=admin_id).all()
        return restaurants
    
    

@blp.route("/api/admins/login")
class AdminLogin(MethodView):
    @blp.arguments(LoginSchema)
    def post(self, admin_data):
        """Log in an admin and return access and refresh tokens."""
        return login_logic(admin_data, Admin, "admin")

@blp.route("/api/admins/logout")
class AdminLogout(MethodView):
    @jwt_required()
    def post(self):
        """Log out the current admin."""
        jti = get_jwt()["jti"]
        exp = get_jwt()["exp"]  # Token expiration timestamp
        return logout_logic(jti, exp)
