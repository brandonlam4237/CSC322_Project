from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response

from .serializers import CustomerSerializer, EmployeeSerializer

User = get_user_model()


class RegisterUser(APIView):
    permission_classes = (permissions.AllowAny, )
    USER_TYPES = {"customer", "employee"}

    def post(self, request):
        try:
            data = request.data

            username = data['username']
            email = data['email']
            password = data['password']
            re_password = data['re_password']

            user_type = data['user_type']

            # Request Error Handlings
            if user_type not in RegisterUser.USER_TYPES:
                return Response(
                    {'error': 'Invalid user type given'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if password != re_password:
                return Response(
                    {'error': 'Passwords do not match'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if User.objects.filter(username=username).exists():
                return Response(
                    {'error': 'User with this username already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if User.objects.filter(email=email).exists():
                return Response(
                    {'error': 'User with this email already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # User Creation
            if user_type == "customer":
                User.objects.create_customer(data, password)
            else:
                User.objects.create_employee(data, password)

            return Response(
                {'error': 'User account created successfully'},
                status=status.HTTP_201_CREATED
            )

        except KeyError:
            return Response(
                {'error': 'Something went wrong when registering an account'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class SignoutUser(APIView):
    pass