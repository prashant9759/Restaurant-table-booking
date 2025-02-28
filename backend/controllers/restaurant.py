from email import message
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from flask_jwt_extended import (
        get_jwt_identity, 
        jwt_required, 
        get_jwt
    )

from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import raiseload


from models import (
    Restaurant, 
    CuisineType,
    RestaurantPolicy,
    CityStateModel
)
from db import db
from schemas import  (
    RestaurantSchema , 
    RestaurantPolicySchema, 
    CuisineUpdateSchema, 
    AddressSchema
)
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
        """Create a new restaurant with policy and cuisines."""
        check_admin_role()
        admin_id = get_jwt_identity()
        address_field = manage_address_field(data)

        # Extract and process cuisines
        cuisine_names = data.pop("cuisines", [])
        cuisine_instances = CuisineType.query.filter(CuisineType.name.in_(cuisine_names)).all()

        if len(cuisine_instances) != len(cuisine_names):
            missing = set(cuisine_names) - {c.name for c in cuisine_instances}
            abort(400, message=f"Invalid cuisines provided: {', '.join(missing)}")

        # Extract and process policy
        policy_data = data.pop("policy", None)
        if not policy_data:
            abort(400, message="Policy information is required.")

        try:
            # Create Policy and Restaurant together (using relationship)
            policy = RestaurantPolicy(**policy_data)
            restaurant = Restaurant(
                admin_id=admin_id,
                policy=policy,  # Assign directly using relationship
                **data,
                **address_field,
                cuisines=cuisine_instances
            )

            db.session.add(restaurant)
            db.session.commit()

        except IntegrityError as e:
            db.session.rollback()
            abort(400, message=f"Integrity Error: {e.orig}")
        except SQLAlchemyError as e:
            db.session.rollback()
            print("Error:", e)
            abort(500, message="An error occurred while creating the restaurant and policy.")

        return {
            "restaurant": restaurant.to_dict(),
            "message": "Restaurant created successfully",
            "status": 201
        }, 201


@blp.route("/api/admins/restaurants/<int:restaurant_id>")
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
    @blp.arguments(RestaurantSchema(partial=True))
    def patch(self, update_data, restaurant_id):
        """Update general details of a restaurant (excluding cuisines, address, and policy)."""
        check_admin_role()
        admin_id = get_jwt_identity()

        restaurant = db.session.query(
            Restaurant.id, 
            Restaurant.name, 
            Restaurant.cover_image, 
            Restaurant.description,
            Restaurant.admin_id
        ).filter_by(id=restaurant_id).first_or_404()

        if str(restaurant.admin_id) != admin_id:
            abort(403, message="You do not have permission to modify this restaurant.")

        # Remove unwanted fields (cuisines, address, policy) before updating
        restricted_fields = {"cuisines", "address", "policy"}
        filtered_data = {key: value for key, value in update_data.items() if key not in restricted_fields}

        if not filtered_data:
            abort(400, message="No valid fields provided for update.")

        # Update only the allowed fields
        for key, value in filtered_data.items():
            setattr(restaurant, key, value)

        try:
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, message="An error occurred while updating the restaurant.")

        return {
            "message": "Restaurant updated successfully.",
            "updated_fields": filtered_data
        }, 200


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


@blp.route("/api/admins/restaurants/all")
class AllRestaurants(MethodView):
    @jwt_required()
    def get(self):
        """Get all restaurants managed by the current admin."""
        check_admin_role()
        admin_id = get_jwt_identity()

        # Fetch all restaurants belonging to this admin
        restaurants = Restaurant.query.filter_by(admin_id=admin_id).all()
        if not restaurants or len(restaurants) ==0:
            abort(404, message="No restaurant found for this admin")
        return  {
            "data": [restaurant.to_dict() for restaurant in restaurants],
            "message": "Restaurants fetched successfully",
            "status": 200
        } , 200
   
   

@blp.route("/api/admins/restaurants/<int:restaurant_id>/policy")
class RestaurantPolicyResource(MethodView):

    @jwt_required()
    @blp.arguments(RestaurantPolicySchema(partial=True))
    def patch(self, policy_data, restaurant_id):
        """Partially update the restaurant policy."""
        check_admin_role()
        current_admin_id = get_jwt_identity()

        # Fetch admin_id & policy in a single query
        result = db.session.query(Restaurant.admin_id, RestaurantPolicy) \
            .join(RestaurantPolicy, Restaurant.policy_id == RestaurantPolicy.id) \
            .filter(Restaurant.id == restaurant_id).first()
        
        admin_id, policy = result if result else (None, None)

        if not policy:
            abort(404, message="Restaurant or policy not found.")

        # Verify restaurant ownership
        if str(admin_id) != current_admin_id:
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
        
        
@blp.route("/api/admins/restaurants/<int:restaurant_id>/cuisines")
class RestaurantCuisineResource(MethodView):

    @jwt_required()
    @blp.arguments(CuisineUpdateSchema)
    def patch(self, cuisine_data, restaurant_id):
        """Add or remove cuisines from a restaurant."""
        check_admin_role()
        admin_id = get_jwt_identity()

        # Fetch only required fields: admin_id and cuisines
        restaurant = Restaurant.query.filter_by(id=restaurant_id).first_or_404()


        if str(restaurant.admin_id) != admin_id:
            abort(403, message="You do not have permission to modify this restaurant.")

        # Extract cuisine names from request data
        cuisines_to_add = set(cuisine_data.get("add", []))
        cuisines_to_remove = set(cuisine_data.get("remove", []))
        
        if not cuisines_to_add and not cuisines_to_remove:
            abort(400, message = "Nothing to update")

        # Fetch existing cuisines of the restaurant
        current_cuisines = {c.name for c in restaurant.cuisines}

        # Ensure cuisines to remove actually exist in the restaurant
        invalid_removals = cuisines_to_remove - current_cuisines
        if invalid_removals:
            abort(400, message=f"Cannot remove cuisines that are not assigned to the restaurant: {', '.join(invalid_removals)}")

        # Ensure cuisines to add are not already present
        invalid_additions = cuisines_to_add & current_cuisines
        if invalid_additions:
            abort(400, message=f"Cannot add cuisines that are already assigned to the restaurant: {', '.join(invalid_additions)}")

        # Fetch valid cuisines from the database
        valid_cuisines = CuisineType.query.filter(CuisineType.name.in_(cuisines_to_add | cuisines_to_remove)).all()
        valid_cuisine_names = {c.name for c in valid_cuisines}

        # Identify invalid cuisines
        invalid_cuisines = (cuisines_to_add | cuisines_to_remove) - valid_cuisine_names
        if invalid_cuisines:
            abort(400, message=f"Invalid cuisines provided: {', '.join(invalid_cuisines)}")

        # Convert valid cuisines into a dictionary for quick lookup
        cuisine_map = {c.name: c for c in valid_cuisines}

        # Add cuisines
        for name in cuisines_to_add:
            restaurant.cuisines.append(cuisine_map[name])

        # Remove cuisines
        restaurant.cuisines = [c for c in restaurant.cuisines if c.name not in cuisines_to_remove]

        try:
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, message="Failed to update restaurant cuisines.")

        return {
            "message": "Restaurant cuisines updated successfully.",
            "cuisines": [c.name for c in restaurant.cuisines],
        }, 200


@blp.route("/api/admins/restaurants/<int:restaurant_id>/address")
class RestaurantAddressResource(MethodView):

    @jwt_required()
    @blp.arguments(AddressSchema(partial=True))
    def patch(self, data, restaurant_id):
        """Partially update the restaurant policy."""
        check_admin_role()
        current_admin_id = get_jwt_identity()

        restaurant = Restaurant.query.get_or_404(restaurant_id)
        

        # Verify restaurant ownership
        if str(restaurant.admin_id) != current_admin_id:
            abort(403, message="You do not have permission to modify this restaurant policy.")
        return update_address(restaurant,data,"restaurant")
        