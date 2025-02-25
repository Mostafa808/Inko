from django.contrib import admin
from Core import models

# Register your models here.

# Main models
admin.site.register(models.User)
admin.site.register(models.Session)

# User data models
admin.site.register(models.User_Data)
admin.site.register(models.Credentials)
admin.site.register(models.Full_Name)
admin.site.register(models.Address)

# subscription models
admin.site.register(models.Subscription_Data)

# template models
admin.site.register(models.Template)