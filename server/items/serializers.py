from rest_framework import serializers
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    """
    Serializer for Computer Part Data
    """

    class Meta:
        """
        Serialize all fields in Computer Part model
        """
        model = Item
        fields = '__all__'
