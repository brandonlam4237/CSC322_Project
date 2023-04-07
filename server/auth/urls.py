from django.urls import path
from .views import RegisterUser, SignoutUser

urlpatterns = [
    path('register', RegisterUser.as_view()),
    path('signout', SignoutUser.as_view())
]
