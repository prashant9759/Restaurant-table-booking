from flask_smorest import Blueprint, abort
from flask.views import MethodView
from flask_jwt_extended import (
        get_jwt_identity, 
        jwt_required, 
        get_jwt
    )

from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from tables import  Restaurant
from db import db
from schemas import  RestaurantSchema , RestaurantPolicySchema
from services.helper import *

blp = Blueprint("Restaurants", __name__, description="Operations on Restaurants")

def check_admin_role():
    """Check if the JWT contains the 'admin' role."""
    claims = get_jwt()
    if claims.get("role") != "admin":
        abort(403, message="Access forbidden: Admin role required.")


@blp.route("/api/admins/restaurants")
class AdminList(MethodView):
    @jwt_required()
    @blp.arguments(RestaurantSchema)
    def post(self, data):
        """Create a new restaurant and return the created restaurant"""
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
   
   

@blp.route("/api/restaurants/<int:restaurant_id>/policy")
class RestaurantPolicyResource(MethodView):
    
    @jwt_required()
    @blp.arguments(RestaurantPolicySchema)
    def post(self, policy_data, restaurant_id):
        """Create a new restaurant policy."""
        check_admin_role()
        admin_id = get_jwt_identity()

        # Verify restaurant ownership
        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant or str(restaurant.admin_id) != admin_id:
            abort(403, message="You do not have permission to add policy for this restaurant.")

        # Create policy using deserialized data
        new_policy = RestaurantPolicy(restaurant_id=restaurant_id, **policy_data)

        try:
            db.session.add(new_policy)
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            abort(400, message=f"Integrity error: {e.orig}")
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, message="Failed to create restaurant policy.")

        return {
            "message": "Restaurant policy created successfully.",
            "policy": new_policy.to_dict()
        }, 201

    @jwt_required()
    @blp.arguments(RestaurantPolicySchema)
    def put(self, policy_data, restaurant_id):
        """Fully update (replace) the restaurant policy."""
        check_admin_role()
        admin_id = get_jwt_identity()

        policy = RestaurantPolicy.query.filter_by(restaurant_id=restaurant_id).first()
        if not policy:
            abort(404, message="Restaurant policy not found.")

        # Verify restaurant ownership
        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant or str(restaurant.admin_id) != admin_id:
            abort(403, message="You do not have permission to modify this restaurant policy.")

        # Update all fields
        for key, value in policy_data.items():
            setattr(policy, key, value)

        try:
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, message="Failed to update restaurant policy.")

        return {
            "message": "Restaurant policy updated successfully.",
            "policy": policy.to_dict()
        }, 200

    @jwt_required()
    @blp.arguments(RestaurantPolicySchema(partial=True))
    def patch(self, policy_data, restaurant_id):
        """Partially update the restaurant policy."""
        check_admin_role()
        admin_id = get_jwt_identity()

        policy = RestaurantPolicy.query.filter_by(restaurant_id=restaurant_id).first()
        if not policy:
            abort(404, message="Restaurant policy not found.")

        # Verify restaurant ownership
        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant or str(restaurant.admin_id) != admin_id:
            abort(403, message="You do not have permission to modify this restaurant policy.")

        # Update only provided fields
        for key, value in policy_data.items():
            setattr(policy, key, value)

        try:
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, message="Failed to partially update restaurant policy.")

        return {
            "message": "Restaurant policy partially updated.",
            "policy": policy.to_dict()
        }, 200