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
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30, blank=True, default='')
    last_name = models.CharField(max_length=30)
    # full name viewer
    def __str__(self) -> str:
        full_name = self.first_name
        if self.middle_name:
            full_name += f" {self.middle_name}"
        full_name += f" {self.last_name}"
        return full_name
# Address model
class Address(models.Model):
    id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=100, blank=True, default='')
    city = models.CharField(max_length=20, blank=True, default='')
    governorate = models.CharField(max_length=20, blank=True, default='')
    country = models.CharField(max_length=20, blank=True, default='')
    zip_code = models.CharField(max_length=10, blank=True, default='')
    # address viewer
    def __str__(self) -> str:
        address = self.address
        if self.city:
            address += f", {self.city}"
        if self.governorate:
            address += f", {self.governorate}"
        if self.country:
            address += f", {self.country}"
        if self.zip_code:
            address += f", {self.zip_code}"
        return address
# User Data Credentials
class Credentials(models.Model):
    username = models.CharField(max_length=15, primary_key=True, validators=[custom_validators.User_Data_Validator.validate_username])
    email = models.EmailField(unique=True)
    # hashed_password is a hash of the username, password, and salt
    hashed_password = models.CharField(max_length=64)
    def __str__(self) -> str:
        return self.username
    
# User Data model
class User_Data(models.Model):
    # authantication is composition of Credentials and a primary key
    authantication = models.OneToOneField(Credentials, on_delete=models.CASCADE, primary_key=True)
    is_admin = models.BooleanField(default=False)
    full_name = models.OneToOneField(Full_Name, on_delete=models.CASCADE)
    address = models.OneToOneField(Address, on_delete=models.CASCADE, null=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=Gender.choices, default=Gender.non_specified)
    def __str__(self) -> str:
        return str(self.authantication)+f" ({self.full_name})"

# subscription model
class Subscription_Data(models.Model):
    subscription_id = models.CharField(max_length=64, unique=True)
    price_plan = models.CharField(max_length=1, choices=Price_Plan.choices, default=Price_Plan.trial)
    start_date = models.DateField()
    end_date = models.DateField()
    price = models.PositiveIntegerField()
    # subscription viewer
    def __str__(self) -> str:
        return self.subscription_id
# User entity
class User(models.Model):
    user_data = models.OneToOneField(User_Data, on_delete=models.CASCADE, primary_key=True)
    subscription = models.OneToOneField(Subscription_Data, on_delete=models.CASCADE)
    # user viewer
    def __str__(self) -> str:
        return str(self.user_data)
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
    # template viewer
    def __str__(self) -> str:
        return self.name
# Session entity
class Session(models.Model):
    session_id = models.CharField(max_length=64, primary_key=True)
    expire_date = models.DateField()
    # OTP encryption serial keys
    key = models.CharField(max_length=64)
    next_key = models.CharField(max_length=64)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # session viewer
    def __str__(self) -> str:
        return self.session_id