from marshmallow_sqlalchemy import ModelSchema

from candis.app.server.models.user import User

class UserSchema(ModelSchema):
    class Meta:
        model = User
