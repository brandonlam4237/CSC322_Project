from django.urls import path
from .views import CustomerList
from .views import BlacklistedUserList, BlacklistUser, CustomerDetail
from .views import UserList
from .views import ActivateUser

urlpatterns = [
    path('', UserList.as_view()),

    path('customer', CustomerList.as_view()),
    path('customer/<int:id>', CustomerDetail.as_view()),

    path('blacklist', BlacklistedUserList.as_view()),
    path('blacklist/<int:id>', BlacklistUser.as_view()),

    path('activate/<int:id>', ActivateUser.as_view())
]
