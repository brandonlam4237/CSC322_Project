from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for general user type
    """
    class Meta:
        """
        Fields
        ------
        model : django Model
            User model
        fields : tuple[str]
            Tuple of every field to be serialized
        """
        model = User
        fields = (
            'id',
            'username',
            'email',
            'is_active',
            'first_name',
            'last_name',
            'date_created',
            'user_type',
            'blacklisted',
            'balance',
            'application_memo',
        )


class EmployeeSerializer(serializers.ModelSerializer):
    """
    Serializer for Employee user type
    """
    class Meta:
        """
        Fields
        ------
        model : django Model
            User model
        fields : tuple[str]
            Tuple of every field to be serialized
        """
        model = User
        fields = (
            'id',
            'username',
            'email',
            'is_active',
            'first_name',
            'last_name',
            'blacklisted',
            'user_type',
            'application_memo',
        )


class CustomerSerializer(serializers.ModelSerializer):
    """
    Serializer for Customer user type
    """
    class Meta:
        """
        Fields
        ------
        model : django Model
            User model
        fields : tuple[str]
            Tuple of every field to be serialized
        """
        model = User
        fields = (
            'id',
            'username',
            'email',
            'is_active',
            'first_name',
            'last_name',
            'balance',
            'blacklisted',
            'user_type',
            'application_memo',
        )
