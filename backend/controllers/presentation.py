from flask_jwt_extended import get_jwt_identity, jwt_required,get_jwt
from flask_smorest import Blueprint, abort
from flask.views import MethodView

from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import raiseload, joinedload, subqueryload
from collections import defaultdict

from models import *
from schemas import  *
from services.helper import *

from db import db
from datetime import datetime, timedelta



blp = Blueprint("Presentation", __name__, description="Routes for our main website page")


from datetime import datetime, time, timedelta

def generate_time_slots(opening_time, closing_time, reservation_duration):
    slots = []
    
    # Convert opening_time & closing_time to datetime for arithmetic operations
    current_time = datetime.combine(datetime.today(), opening_time)
    closing_datetime = datetime.combine(datetime.today(), closing_time)

    while current_time + timedelta(minutes=reservation_duration) <= closing_datetime:
        slots.append(current_time.strftime("%H:%M"))  # Format as HH:MM
        current_time += timedelta(minutes=reservation_duration)  # Move to next slot

    return slots




def add_table_info(restaurant):
    restaurant_dict = restaurant.to_dict()
    
    # Add the table type and instances
    restaurant_dict["table_types"] = [
        {
            **table_type.to_dict(),
            "tables": [table.to_dict() for table in table_type.tables]  # Add table instances
        }
        for table_type in restaurant.table_types
    ]
    return restaurant_dict


@blp.route("/api/restaurants/all")
class RestaurantList(MethodView):
    def get(self):
        """Fetch all restaurants with required details"""

        restaurants = (
            db.session.query(Restaurant)
            .options(
                subqueryload(Restaurant.table_types).subqueryload(TableType.tables),  # Load table types and instances
            )
            .order_by(Restaurant.city_state_id)  # Order by city_state_id for efficient grouping
            .all()
        )
        city_grouped_restaurants = defaultdict(list)

        # Iterate through the restaurants and group them by city
        for restaurant in restaurants:
            city = restaurant.city_state.city if restaurant.city_state else "Unknown"
            restaurant_dict =  add_table_info(restaurant)
            city_grouped_restaurants[city].append(restaurant_dict)

            # Convert defaultdict to dict before returning
        return {
            "data": dict(city_grouped_restaurants),
            "message": "All restaurants fetched successfully",
            "status": 200
        }, 200



@blp.route("/api/restaurants/city/<int:city_state_id>/categorised_by_cuisines")
class RestaurantList(MethodView):
    def get(self,city_state_id):
        """Fetch all restaurants with required details"""

        restaurants = (
            db.session.query(Restaurant)
            .options(
                subqueryload(Restaurant.table_types).subqueryload(TableType.tables),  # Load table types and instances
            )
            .filter(Restaurant.city_state_id == city_state_id)  # Order by city_state_id for efficient grouping
            .all()
        )
        cuisine_grouped_restaurants = defaultdict(list)

        # Iterate through the restaurants and group them by city
        for restaurant in restaurants:
            restaurant_dict =  add_table_info(restaurant)
            
             # Add restaurant under each cuisine category it belongs to
            for cuisine in restaurant.cuisines:
                cuisine_grouped_restaurants[cuisine.name].append(restaurant_dict)
            # Convert defaultdict to dict before returning
        return {
            "data": dict(cuisine_grouped_restaurants),
            "message": "All restaurants fetched successfully",
            "status": 200
        }, 200


@blp.route("/api/bookings/availability/<int:restaurant_id>/<string:date>")
class AvailableTablesForDate(MethodView):
    def get(self, restaurant_id, date):
        # Fetch restaurant details
        policy = (
            db.session.query(RestaurantPolicy)
            .join(Restaurant, Restaurant.policy_id == RestaurantPolicy.id)  # Correct join
            .filter(Restaurant.id == restaurant_id)  # Fetch policy for the specific restaurant
            .first()
        )

        if not policy:
            return abort(404, message = "No restaurant or policy found")
        # Generate time slots dynamically based on restaurant timing & reservation duration
        time_slots = generate_time_slots(
            policy.opening_time, 
            policy.closing_time, 
            policy.reservation_duration
        )

        # Fetch only booked tables that match the given date
        booked_data = (
            db.session.query(
                Booking.start_time,
                db.func.count(BookingTable.table_id).label("count"),
                TableInstance.table_type_id
            )
            .join(Booking, BookingTable.booking_id == Booking.id)
            .join(TableInstance, BookingTable.table_id == TableInstance.id)
            .filter(
                Booking.date == date,  # Only for the requested date
                Booking.restaurant_id == restaurant_id
            )
            .group_by(Booking.start_time, TableInstance.table_type_id)
            .all()
        )

        # Organize booked data into a dictionary
        booked_tables_dict = {}

        for start_time, count, table_type_id in booked_data:
            if table_type_id not in booked_tables_dict:
                booked_tables_dict[table_type_id] = {}  # Initialize nested dictionary

            booked_tables_dict[table_type_id][start_time] = count  # Store count for the time slot



        # Fetch all table types in the restaurant along with their details and table count
        table_types = (
            db.session.query(
                TableType.id,
                TableType.name,
                TableType.capacity,
                TableType.description,
                TableType.is_outdoor,
                TableType.is_accessible,
                TableType.shape,
                db.func.count(TableInstance.id).label("count"),
            )
            .outerjoin(TableInstance, TableInstance.table_type_id == TableType.id)  # Use outer join to include table types with zero       tables
            .filter(TableType.restaurant_id == restaurant_id)
            .group_by(TableType.id)
            .all()
        )

        # Convert query results into structured data
        table_types_data = [
            {
                "table_type_id": t.id,
                "name": t.name,
                "capacity": t.capacity,
                "description": t.description,
                "is_outdoor": t.is_outdoor,
                "is_accessible": t.is_accessible,
                "shape": t.shape.name,
                "table_count": t.count,
            }
            for t in table_types
        ]

        # Initialize available data dictionary using table_type_id as the key
        available_data = {
            t["table_type_id"]: {
                "typeInfo": t,  # Store general table type details
                "countInfo": {}  # Will store available count per time slot
            }
            for t in table_types_data
        }

        # Populate available counts for each type_id & slot combination
        for table_type in table_types_data:
            table_type_id = table_type["table_type_id"]
            total_table_count = table_type["table_count"]

            for start_time in time_slots:
                time_slot_key = f"{date}%{start_time}"

                # Get booked tables count (default to 0 if not booked)
                booked_table_count = booked_tables_dict.get(table_type_id, {}).get(start_time, 0)

                # Compute available tables
                available_count = max(0, total_table_count - booked_table_count)

                # Store the available count
                available_data[table_type_id]["countInfo"][time_slot_key] = available_count
        
        return {"data":available_data, "message":"availability data detched successfully", "status":200},200




@blp.route("/api/restaurants/<int:restaurant_id>/bookings")
class CreateBooking(MethodView):
    @jwt_required()
    @blp.arguments(BookingRequestSchema)
    def post(self, booking_data, restaurant_id):
        """Create a new booking after validating user, restaurant, and table availability."""
        user_id = get_jwt_identity()
        claims = get_jwt()
        if claims.get("role") != "user":
            abort(403, message="Access forbidden: user role required.")
        
        guest_count = booking_data["guest_count"]
        date = booking_data["date"]
        start_time = booking_data["start_time"]
        table_type_info = booking_data["table_type_info"]

        # Step 1: Validate User
        user = db.session.get(User, user_id)
        if not user:
            return {"message": "User not found."}, 404

        # Step 2: Validate Restaurant
        restaurant = db.session.get(Restaurant, restaurant_id)
        if not restaurant:
            return {"message": "Restaurant not found."}, 404

        # Step 3: Fetch restaurant policy for table availability checks
        policy = restaurant.policy
        if not policy:
            return {"message": "Restaurant policy not found."}, 404

        # Step 4: Generate valid time slots
        time_slots = generate_time_slots(
            policy.opening_time, policy.closing_time, policy.reservation_duration
        )
        if start_time not in time_slots:
            return {"message": "Invalid booking time."}, 400

        # Step 5: Validate Table Types
        table_type_ids = [t["table_type_id"] for t in table_type_info]
        table_types = {t.id: t for t in db.session.execute(
            select(TableType).where(
                TableType.id.in_(table_type_ids),
                TableType.restaurant_id == restaurant_id
            )
        ).scalars().all()}  # Convert to dict for easy lookup

        if len(table_types) != len(table_type_info):
            return {"message": "One or more table types are invalid or unavailable."}, 400

        # Step 6: Fetch already booked tables for the given date & time
        stmt = select(BookingTable.table_id).join(Booking).where(
            Booking.restaurant_id == restaurant_id,
            Booking.date == date,
            Booking.start_time == start_time
        )
        already_booked_table_ids = set(db.session.execute(stmt).scalars().all())

        # Step 7: Create Booking Instance
        new_booking = Booking(
            user_id=user_id,
            restaurant_id=restaurant_id,
            guest_count=guest_count,
            date=date,
            start_time=start_time
        )

        # Step 8: Assign Available Tables to Booking
        booked_tables = []
        table_details = {}

        for table_type in table_type_info:
            type_id = table_type["table_type_id"]
            requested_count = table_type["count"]

            # Fetch available tables
            available_tables = db.session.execute(
                select(TableInstance).where(
                    TableInstance.table_type_id == type_id,
                    TableInstance.id.notin_(already_booked_table_ids)
                ).limit(requested_count)
            ).scalars().all()

            if len(available_tables) < requested_count:
                return {"message": f"Not enough available tables for table_type_id {type_id}"}, 400

            # Add to response data
            table_details[type_id] = {
                "table_type_info": table_types[type_id].to_dict(),
                "tables": [table.to_dict() for table in available_tables]
            }

            # Prepare BookingTable instances
            booked_tables.extend([BookingTable(table_id=table.id) for table in available_tables])

        # Associate tables using SQLAlchemy relationship
        new_booking.tables = booked_tables

        # Step 9: Commit Transaction
        try:
            db.session.add(new_booking)
            db.session.commit()
            return {
                "message": "Booking created successfully",
                "booking_details": {
                    "booking_id": new_booking.id,
                    "user_id": new_booking.user_id,
                    "restaurant_id": new_booking.restaurant_id,
                    "guest_count": new_booking.guest_count,
                    "date": str(new_booking.date),
                    "start_time": str(new_booking.start_time),
                    "assigned_tables": table_details
                }
            }, 201
        except SQLAlchemyError as e:
            db.session.rollback()
            print(e)
            return {"message": "Error occurred while creating the booking."}, 500






