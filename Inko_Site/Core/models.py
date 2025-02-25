# Description: This file contains the entities of the core website.
from django.db import models
# validators
import django.core.validators as default_validators
import Core.validators as custom_validators

# Enums
class Gender(models.TextChoices):
    male = 'M',
    female = 'F',
    other = 'O',
    robot = 'R',
    non_specified = 'N'
class Price_Plan(models.TextChoices):
    trial='T',
    monthly='M',
    yearly='Y',
    customized='C'
# Full Name model
class Full_Name(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=20)
    middle_name = models.CharField(max_length=20, blank=True, default='')
    last_name = models.CharField(max_length=20)
# Address model
class Address(models.Model):
    id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=100, blank=True, default='')
    city = models.CharField(max_length=20, blank=True, default='')
    governorate = models.CharField(max_length=20, blank=True, default='')
    country = models.CharField(max_length=20, blank=True, default='')
    zip_code = models.CharField(max_length=10, blank=True, default='')
# User Data Credentials
class Credentials(models.Model):
    username = models.CharField(max_length=15, primary_key=True, validators=[custom_validators.User_Data_Validator.validate_username])
    email = models.EmailField(unique=True)
    # hashed_password is a hash of the username, password, and salt
    hashed_password = models.CharField(max_length=64)
    
# User Data model
class User_Data(models.Model):
    # authantication is composition of Credentials and a primary key
    authantication = models.OneToOneField(Credentials, on_delete=models.CASCADE, primary_key=True)
    is_admin = models.BooleanField(default=False)
    full_name = models.OneToOneField(Full_Name, on_delete=models.CASCADE)
    address = models.OneToOneField(Address, on_delete=models.CASCADE, null=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=Gender.choices, default=Gender.non_specified)

# subscription model
class Subscription_Data(models.Model):
    subscription_id = models.CharField(max_length=64, unique=True)
    price_plan = models.CharField(max_length=1, choices=Price_Plan.choices, default=Price_Plan.trial)
    start_date = models.DateField()
    end_date = models.DateField()
    price = models.PositiveIntegerField()
# User entity
class User(models.Model):
    user_data = models.OneToOneField(User_Data, on_delete=models.CASCADE, primary_key=True)
    subscription = models.OneToOneField(Subscription_Data, on_delete=models.CASCADE)
# Templete entity
class Template(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='templates/')
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=100)
    published_by = models.ForeignKey(User, on_delete=models.CASCADE)
    published_date = models.DateField()
    view_count = models.PositiveIntegerField()
    download_count = models.PositiveIntegerField()
# Session entity
class Session(models.Model):
    session_id = models.CharField(max_length=64, primary_key=True)
    expire_date = models.DateField()
    # OTP encryption serial keys
    key = models.CharField(max_length=64)
    next_key = models.CharField(max_length=64)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)