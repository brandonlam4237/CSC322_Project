from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.apps import apps

User = get_user_model()
Product = apps.get_model('items', 'Product')
ComputerPart = apps.get_model('items', 'ComputerPart')
CustomBuild = apps.get_model('items', 'CustomBuild')
Cart = apps.get_model('items', 'Cart')
CartItem = apps.get_model('items', 'CartItem')
Order = apps.get_model('items', 'Order')


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
            'blacklisted',
            'user_type',
            'application_memo',
            'warnings',
            'compliments',
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
            'balance',
            'blacklisted',
            'user_type',
            'application_memo',
            'warnings',
            'compliments',
            'has_discount',
        )


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for Product Data
    """

    class Meta:
        """
        Serialize all fields in Product model
        """
        model = Product
        fields = '__all__'


class ComputerPartSerializer(serializers.ModelSerializer):
    """
    Serializer for Computer Part Data
    """
    class Meta:
        """
        Serialize all fields in Computer Part model
        """
        model = ComputerPart
        fields = '__all__'


class CustomBuildSerializer(serializers.ModelSerializer):
    """
    Serializer for Custom Build Data
    """

    parts = ComputerPartSerializer(many=True)

    class Meta:
        """
        Fields to serialize:
            parts
        """
        model = CustomBuild
        fields = (
            'parts'
        )


class CartItemsSerializer(serializers.ModelSerializer):
    """
    Serializer for Cart Item Data
    """

    product = ProductSerializer()

    class Meta:
        """
        Fields to serialize:
            product
            quantity
            price
        """
        model = CartItem
        fields = (
            'product',
            'quantity',
            'price'
        )


class CartSerializer(serializers.ModelSerializer):
    """
    Serializer for Cart Data
    """

    class Meta:
        """
        Fields:
            num_items
            total_price
        """
        model = Cart
        fields = (
            'num_items',
            'total_price'
        )


class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for Order Data
    """

    items = CartItemsSerializer(many=True)

    class Meta:
        """
        Fields:
            address
            items
            datetime_ordered
            total_price
        """
        model = Order
        exclude = (
            'customer',
        )


class BuildSerializer(serializers.ModelSerializer):
    """
    Serializer for Custom Build Data
    """

    class BuilderSerializer(serializers.ModelSerializer):
        class Meta:
            """
            Fields
            ------
                id
                username
            """
            model = User
            fields = (
                'id',
                'username',
            )

    builder = BuilderSerializer()
    parts = ComputerPartSerializer(many=True)

    class Meta:
        """
        Serialize all fields in the Build Model
        """
        model = CustomBuild
        exclude = (
            'date_created',
        )
