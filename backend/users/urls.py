from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from . import views


router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
router.register('saved', SavedInfoViewset, basename='saved')
router.register('delete-saved', SavedInfoDelete, basename='delete-saved')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('saved/', views.SavedInfoViewset.as_view(), name='saved-list'),
#     path('saved/delete/<int:pk>/', views.SavedInfoDelete.as_view(), name='delete-saved')
# ]

urlpatterns = router.urls