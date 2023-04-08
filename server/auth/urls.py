from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView
from .views import RegisterUser, LogoutUser


urlpatterns = [
    path('register', RegisterUser.as_view()),
    path('logout', LogoutUser.as_view()),

    path('login', TokenObtainPairView.as_view()),
    path('token/verify', TokenVerifyView.as_view())
]
