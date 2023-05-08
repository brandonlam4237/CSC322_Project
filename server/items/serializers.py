from rest_framework import serializers
from .models import Product, ComputerPart, CustomBuild


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


class BuildSerializer(serializers.ModelSerializer):
    """
    Serializer for Custom Build Data
    """

    build_parts = ComputerPartSerializer(many=True)

    class Meta:
        """
        Serialize all fields in the Build Model
        """
        model = CustomBuild
        exclude = (
            'date_created',
        )
