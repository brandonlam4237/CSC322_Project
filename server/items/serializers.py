from rest_framework import serializers
from .models import Product, ComputerPart


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
