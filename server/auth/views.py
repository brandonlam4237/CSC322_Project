from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomerSerializer, EmployeeSerializer, UserSerializer

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


class RetrieveCurrentUser(APIView):
    """
    Retrieves the current user details
    """

    def get(self, request):
        """
        Retrieves the current user details and will serialize by their user type
        """
        user = request.user

        if user.is_customer:
            user = CustomerSerializer(user)
            return Response(user.data, status=status.HTTP_200_OK)

        if user.is_employee:
            user = EmployeeSerializer(user)
            return Response(user.data, status=status.HTTP_200_OK)

        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)


class LoginUser(APIView):
    """
    An API View class for logging in.

    Methods
    -------
    post(request)
        Receives a POST request to login a user
    """
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        """
        Handles a POST request when logging in a user
        """
        username = request.data.get('username')
        password = request.data.get('password')
        user = get_object_or_404(User, username=username)

        if not user.check_password(password):
            return Response(
                {'error': 'Wrong password'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_active:
            return Response(
                {'error': 'Account has not been activated'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        if user.is_superuser:
            user = UserSerializer(user)
        elif user.is_customer:
            user = CustomerSerializer(user)
        else:
            user = EmployeeSerializer(user)

        return Response(
            {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user.data
            }
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
