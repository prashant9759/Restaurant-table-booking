from marshmallow import Schema, fields, validate, validates, ValidationError, post_load
from tables import CuisineEnum, Weekday, WEEKDAY_BITMASK, TableShape




class TableTypeSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1, max=50))
    capacity = fields.Int(required=True, validate=validate.Range(min=1))
    description = fields.Str(validate=validate.Length(max=200))
    is_outdoor = fields.Bool(required=True)
    is_accessible = fields.Bool(missing=False)
    shape = fields.Str(
        required=True,
        validate=validate.OneOf([shape.value for shape in TableShape]),
        description="Shape of the table (e.g., 'Round', 'Square', 'Rectangle', 'Oval')"
    )

    @post_load
    def validate_table_type(self, data, **kwargs):
        if data.get("capacity", 1) < 1:
            raise ValidationError("Table capacity must be at least 1.")
        return data



class RestaurantPolicySchema(Schema):
    id = fields.Int(dump_only=True)

    # Accepts array of days in request body
    working_days = fields.List(
        fields.Str(validate=validate.OneOf([day.value for day in Weekday])),
        required=True,
        description="List of working days (e.g., ['Monday', 'Wednesday', 'Friday'])"
    )

    opening_time = fields.Time(required=True, format='%H:%M')
    closing_time = fields.Time(required=True, format='%H:%M')

    max_party_size = fields.Int(required=True, validate=validate.Range(min=1))
    max_advance_days = fields.Int(required=True, validate=validate.Range(min=0))
    reservation_duration = fields.Int(required=True, validate=validate.Range(min=1))

    @validates("working_days")
    def validate_days(self, value):
        if not value:
            raise ValidationError("At least one working day must be selected.")

    @post_load
    def convert_days_to_bitmask(self, data, **kwargs):
        """Convert list of days to bitmask before saving to DB."""
        if data.get("working_days"):
            day_bitmask = sum(WEEKDAY_BITMASK[day] for day in data["working_days"])
            data["working_days"] = day_bitmask
        return data




class BaseUserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    phone = fields.Str()
    password = fields.Str(load_only=True, required=True)
    role = fields.Str(dump_only=True, default='user')
    created_at = fields.DateTime(dump_only=True)

    @validates('phone')
    def validate_phone(self, value):
        if value and not value.isdigit():
            raise ValidationError("Phone number must contain only digits.")
        
class UserSchema(BaseUserSchema):
    pass

    

class AdminSchema(BaseUserSchema):
    pass


class AddressSchema(Schema):
    id = fields.Int(dump_only=True)
    street = fields.Str(required=True)
    city = fields.Str(required=True)
    state = fields.Str(required=True)
    postal_code = fields.Str(required=True)
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    
class RestaurantSchema(Schema):
    name = fields.String(required=True, validate=validate.Length(min=1))
    cover_image = fields.String(required=False)
    description = fields.String(required=False)
    # Cuisines from Enum
    cuisines = fields.List(
        fields.String(validate=validate.OneOf([cuisine.value for cuisine in CuisineEnum])),
        required=True,
        validate=validate.Length(min=1, error="At least one cuisine must be provided.")
    )
    # Nested Fields
    address = fields.Nested(AddressSchema, required=True)

    @validates('cover_image')
    def validate_cover_image(self, value):
        if value and not value.startswith(('http://', 'https://')):
            raise ValidationError("Cover image URL must start with http:// or https://")

    
class LoginSchema(Schema):
    name = fields.Str(required=True)
    password = fields.Str(required=True)