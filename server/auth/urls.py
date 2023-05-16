from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView
from .views import RegisterUser, LogoutUser, RetrieveCurrentUser, LoginUser


urlpatterns = [
    path('register', RegisterUser.as_view()),
    path('logout', LogoutUser.as_view()),
    path('me', RetrieveCurrentUser.as_view()),

    path('login', LoginUser.as_view()),
    path('token/verify', TokenVerifyView.as_view())
]
