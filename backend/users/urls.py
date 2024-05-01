from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from . import views


router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
router.register('saved', SavedInfoViewset, basename='saved')

urlpatterns = router.urls
