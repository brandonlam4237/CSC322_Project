from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import ComputerPart
from .serializers import ComputerPartSerializer


class PartList(APIView):
    """
    Gets a list of products
    """
    permission_classes = (permissions.AllowAny,)
    PRODUCT_CATEGORIES = {
        "CPU",
        "GPU",
        "Motherboard",
        "Storage",
        "RAM",
        "Case",
        "PSU",
        "Cooling",
        "Desktop"
    }

    def get(self, request, format=None):
        """
        Handles a GET request to retrieve all products
        """
        category = request.query_params.get('category')

        if category is None:
            product_list = ComputerPart.objects.order_by('id')
        elif category in self.PRODUCT_CATEGORIES:
            product_list = ComputerPart.objects.filter(category=category)
        else:
            return Response(
                {'error': 'This category doesn\'t exist'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ComputerPartSerializer(product_list, many=True)

        return Response(
            {'products': serializer.data},
            status=status.HTTP_200_OK
        )


class PartDetail(APIView):
    """
    Endpoint to get a product detail
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request, id, format=None):
        """
        Handles a GET request to retrieve a product detail
        """
        part = get_object_or_404(ComputerPart, id=id)
        serializer = ComputerPartSerializer(part, many=False)
        return Response(
            {'products': serializer.data},
            status=status.HTTP_200_OK
        )
