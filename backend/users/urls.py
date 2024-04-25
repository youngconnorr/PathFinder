from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from . import views


router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
router.register('saved', SavedInfoViewset, basename='saved')

# Instead of registering the 'delete-saved' endpoint, you should nest it under 'saved'
saved_router = DefaultRouter()
saved_router.register('', SavedInfoDelete, basename='delete-saved')

# # Include the nested router's URLs under the 'saved' endpoint
# router.registry.extend(saved_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path('saved/delete/<int:pk>/', include(saved_router.urls))
]


# router = DefaultRouter()
# router.register('register', RegisterViewset, basename='register')
# router.register('login', LoginViewset, basename='login')
# router.register('users', UserViewset, basename='users')
# router.register('saved', SavedInfoViewset, basename='saved')
# router.register('delete-saved', SavedInfoDelete, basename='delete-saved')

# # urlpatterns = [
# #     path('', include(router.urls)),
# #     path('saved/', views.SavedInfoViewset.as_view(), name='saved-list'),
# #     path('saved/delete/<int:pk>/', views.SavedInfoDelete.as_view(), name='delete-saved')
# # ]

# urlpatterns = router.urls