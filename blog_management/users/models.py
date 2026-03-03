# from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to="media/profile_pic",default="media/profile_pic/default.png",blank=True)
    role = models.CharField(default="user",max_length=20,blank=True)
    updated_at = models.DateTimeField( auto_now=True)
    
   