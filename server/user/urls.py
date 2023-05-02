from django.urls import path
from .views import CustomerList
from .views import BlacklistedUserList, BlacklistUser, CustomerDetail
from .views import UserList
from .views import ActivateUser
from .views import AddBalance
from .views import CustomerCart, ManageCart

urlpatterns = [
    path('', UserList.as_view()),

    # User Detail Endpoints
    path('customer', CustomerList.as_view()),
    path('customer/<int:id>', CustomerDetail.as_view()),

    # Modify User Endpoints
    path('blacklist', BlacklistedUserList.as_view()),
    path('blacklist/<int:id>', BlacklistUser.as_view()),

    path('activate/<int:id>', ActivateUser.as_view()),

    path('balance', AddBalance.as_view()),

    # Shopping Cart Endpoints
    path('cart', CustomerCart.as_view()),
    path('cart/<int:id>', ManageCart.as_view()),
]
