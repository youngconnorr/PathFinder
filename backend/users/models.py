from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

#so you can sign in with just email

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is a required field")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields): #is a staff
        extra_fields.setdefault('is_staff', True) 
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields) #uses normal user fn but makes fields true


class CustomUser(AbstractUser):
    email = models.EmailField(max_length=200, unique=True)
    username = models.CharField(max_length=200, null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class SavedInfo(models.Model):
    title = models.CharField(max_length=100)
    itinName = models.CharField(max_length=100, default="Itinerary name")
    month = models.CharField(max_length=50, default="January")
    content = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE,  related_name="saved" ) #foreign key links an object that belongs to an object, in this case saved info is linked to User 
    
    #might need to change abstractuser 
    
    def __str__(self):
        return self.title
    
    
    
    
# Create your models here.
