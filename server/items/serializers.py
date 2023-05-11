from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Comment
from .models import Product, ComputerPart, CustomBuild


User = get_user_model()


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for Comments
    """

    class Meta:
        """
        Serialize all fields in Comment model
        """
        model = Comment
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for Computer Part Data
    """
    class Meta:
        """
        Serialize all fields in Computer Part model
        """
        model = Product
        fields = '__all__'

    comments = CommentSerializer(many=True)


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

    comments = CommentSerializer(many=True)


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

    comments = CommentSerializer(many=True)
