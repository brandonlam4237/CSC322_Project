from rest_framework import serializers
from .models import ComputerPart


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
