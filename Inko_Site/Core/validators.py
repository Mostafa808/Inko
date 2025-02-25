import re
from django.core.exceptions import ValidationError
class User_Data_Validator:
    @staticmethod
    def validate_username(username):
        if not re.match(r"^[a-zA-Z0-9_]{5,15}$", username):
            raise ValidationError("username must be of length between 5 and 15 characters long and contain only letters, numbers, and underscores")
    