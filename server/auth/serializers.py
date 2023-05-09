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
            'warnings',
            'compliments',
            'position_tier',
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
            'user_type',
            'blacklisted',
            'application_memo',
            'warnings',
            'position_tier',
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
            'user_type',
            'balance',
            'blacklisted',
            'application_memo',
            'warnings',
            'compliments',
        )
