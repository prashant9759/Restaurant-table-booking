from marshmallow import Schema, fields, validate, validates, ValidationError
from tables import CuisineEnum






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