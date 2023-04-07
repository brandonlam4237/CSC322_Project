from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import CustomerSerializer, EmployeeSerializer

User = get_user_model()


class RegisterUser(APIView):
    """
    An API View class for registering a UserAccount.

    Attributes
    ----------
    permission_classes : tuple
        Different permission classes that can access the APIView
    USER_TYPES : set
        Set of strings of multiple user types

    Methods
    -------
    post(request)
        Receives a POST request to register a user
    """
    permission_classes = (permissions.AllowAny, )
    USER_TYPES = {"customer", "employee"}

    def post(self, request):
        """
        Receives a POST request to register a user
        """
        try:
            data = request.data

            username = data['username']
            email = data['email']

            first_name = data['first_name']
            last_name = data['last_name']

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
                User.objects.create_customer(
                    username, email, first_name, last_name, password)
            else:
                User.objects.create_employee(
                    username, email, first_name, last_name, password)

            return Response(
                {'success': 'User account created successfully'},
                status=status.HTTP_201_CREATED
            )

        except KeyError:
            return Response(
                {'error': 'Something went wrong when creating an account'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class LogoutUser(APIView):
    """
    An API View class for logging out a UserAccount.

    Methods
    -------
    post(request)
        Handles a POST request to logout a user
    """

    def post(self, request):
        """
        Handles a POST request to logout a user
        """
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({'success': 'User has been logged out'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
