from enum import unique, Enum
from db import db
from datetime import datetime
from sqlalchemy import UniqueConstraint




# Define Cuisine Enum
class CuisineEnum(str, Enum):
    ITALIAN = "Italian"
    CHINESE = "Chinese"
    INDIAN = "Indian"
    MEXICAN = "Mexican"
    JAPANESE = "Japanese"
    FRENCH = "French"
    THAI = "Thai"
    AMERICAN = "American"
    


class Weekday(Enum):
    SUNDAY = "Sunday"
    MONDAY = "Monday"
    TUESDAY = "Tuesday"
    WEDNESDAY = "Wednesday"
    THURSDAY = "Thursday"
    FRIDAY = "Friday"
    SATURDAY = "Saturday"



class TableShape(Enum):
    ROUND = "Round"
    SQUARE = "Square"
    RECTANGLE = "Rectangle"
    OVAL = "Oval"



# Mapping for bitmask calculation
WEEKDAY_BITMASK = {
    Weekday.SUNDAY.value: 1 << 0,
    Weekday.MONDAY.value: 1 << 1,
    Weekday.TUESDAY.value: 1 << 2,
    Weekday.WEDNESDAY.value: 1 << 3,
    Weekday.THURSDAY.value: 1 << 4,
    Weekday.FRIDAY.value: 1 << 5,
    Weekday.SATURDAY.value: 1 << 6,
}




class CityStateModel(db.Model):
    __tablename__ = "city_states"
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    postal_code = db.Column(db.String(20), nullable=False, unique=True)
 
    
    def to_dict(self):
        return {
            "id": self.id,
            "city": self.city,
            "state": self.state,
            "postal_code": self.postal_code
        }



class Restaurant(db.Model):
    __tablename__ = 'restaurant'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    cover_image = db.Column(db.String(255))
    description = db.Column(db.Text)
    admin_id = db.Column(db.Integer, db.ForeignKey('admin.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Inline address fields
    street = db.Column(db.String(255))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    
    # Foreign key to CityStateModel
    city_state_id = db.Column(db.Integer, db.ForeignKey('city_states.id'), nullable=False)
    
    admin = db.relationship('Admin', backref='restaurants', lazy='joined')
    city_state = db.relationship('CityStateModel', lazy='joined')
    table_types = db.relationship('TableType', backref='restaurant', lazy=True)
    policies = db.relationship('RestaurantPolicy', backref='restaurant', uselist=False)
    cuisines = db.relationship(
        'CuisineType',
        secondary='restaurant_cuisine',
        backref='restaurants',
        lazy='joined'  # Ensures cuisines are loaded via JOIN
    )



    def to_dict(self):
        return {
            "restaurantId": self.id,
            "name": self.name,
            "description": self.description,
            "cover_image": self.cover_image,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,

            # Address Object
            "address": {
                "street": self.street,
                "latitude": self.latitude,
                "longitude": self.longitude,
                "city": self.city_state.city if self.city_state else None,
                "state": self.city_state.state if self.city_state else None,
                "postal_code": self.city_state.postal_code if self.city_state else None
            },

            # Admin Object
            "admin": {
                "adminId": self.admin.id if self.admin else None,
                "name": self.admin.name if self.admin else None,
                "email": self.admin.email if self.admin else None,
                "phone": self.admin.phone if self.admin else None
            },
            "cuisines": [cuisine.name for cuisine in self.cuisines] if self.cuisines else []
        }



class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=True, unique=True)
    role = db.Column(db.String(50), nullable=False, default='user')  # 'user' or 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "role" : self.role,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }



class Admin(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=True, unique=True)
    role = db.Column(db.String(50), nullable=False, default='admin')  # 'user' or 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "role":self.role,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }



class TableType(db.Model):
    __tablename__ = 'table_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)  # e.g., "Two-seater", "Family Table"
    capacity = db.Column(db.Integer, nullable=False)  # Number of seats
    description = db.Column(db.String(200))  # Additional info like "Best for couples"
    is_outdoor = db.Column(db.Boolean, default=False)  # Indoor/Outdoor flag
    shape = db.Column(db.Enum(TableShape), nullable=False)  # Added shape field
    is_accessible = db.Column(db.Boolean, default=False)  # Accessibility feature
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    
    __table_args__ = (UniqueConstraint('name', 'restaurant_id', name='_name_restaurant_uc'),)
    
    tables = db.relationship('TableInstance', backref='table_type', lazy=True)
    
    def to_dict(self):
        return {
            "tabletype_id": self.id,
            "name": self.name,
            "capacity": self.capacity,
            "description": self.description,
            "is_outdoor": self.is_outdoor,
            "is_accessible": self.is_accessible,
            "shape": self.shape.name if self.shape else None,  # Convert Enum to string
            "restaurant_id": self.restaurant_id
            
        }


class TableInstance(db.Model):
    __tablename__ = 'table_instance'
    id = db.Column(db.Integer, primary_key=True)
    table_type_id = db.Column(db.Integer, db.ForeignKey('table_type.id'), nullable=False)
    table_number = db.Column(db.String(20), nullable=False)  # Unique ID within restaurant
    location_description = db.Column(db.String(100))  # e.g., "Near window", "By the patio"
    is_available = db.Column(db.Boolean, default=True)  # Track table availability
    
    reservations = db.relationship('TableReservation', backref='table_instance', lazy=True)
    
    def to_dict(self):
        return {
            "table_id": self.id,
            "is_reserved": self.is_reserved,
            "table_type": self.table_type.to_dict() if self.table_type else None,
            "table_number": self.table_number,
            "location_description": self.location_description,
            "is_available": self.is_available
        }


class TableReservation(db.Model):
    __tablename__ = 'table_reservation'
    id = db.Column(db.Integer, primary_key=True)
    table_instance_id = db.Column(db.Integer, db.ForeignKey('table_instance.id'), nullable=False)
    reservation_date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_contact = db.Column(db.String(15), nullable=False)



class RestaurantPolicy(db.Model):
    __tablename__ = 'restaurant_policy'
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    working_days = db.Column(db.Integer, nullable=False)  # Bitmask for days (e.g., Mon, Wed, Fri = 42)
    opening_time = db.Column(db.Time, nullable=False)  # e.g., '09:00'
    closing_time = db.Column(db.Time, nullable=False)  # e.g., '21:00'
    max_party_size = db.Column(db.Integer, nullable=False)
    max_advance_days = db.Column(db.Integer, nullable=False)  # Max days in advance a table can be booked
    reservation_duration = db.Column(db.Integer, nullable=False)  # Duration in minutes for how long a table is reserved
    
    def to_dict(self):
        """Convert RestaurantPolicy instance to dict, with working_days as an array."""
        return {
            "id": self.id,
            "restaurant_id": self.restaurant_id,
            "working_days": self._bitmask_to_days(),
            "opening_time": self.opening_time.strftime("%H:%M"),
            "closing_time": self.closing_time.strftime("%H:%M"),
            "max_party_size": self.max_party_size,
            "max_advance_days": self.max_advance_days,
            "reservation_duration": self.reservation_duration
        }
    def _bitmask_to_days(self):
        """Convert working_days bitmask to a list of weekday names."""
        return [
            day for day, bit in WEEKDAY_BITMASK.items()
            if self.working_days & bit
        ]



class CuisineType(db.Model):
    __tablename__ = 'cuisine_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)  # e.g., 'Veg', 'Non-Veg', 'Vegan'




class RestaurantCuisine(db.Model):
    __tablename__ = 'restaurant_cuisine'
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), primary_key=True)
    cuisine_type_id = db.Column(db.Integer, db.ForeignKey('cuisine_type.id'), primary_key=True)
    



class TokenBlocklist(db.Model):
    __tablename__ = "token_blocklist"

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)
  
  
    
