from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Product
from .serializers import ProductSerializer


class ProductList(APIView):
    """
    Gets a list of products
    """
    permission_classes = (permissions.AllowAny,)
    PRODUCT_CATEGORIES = {
        "Processors/CPUs",
        "Graphics Cards",
        "Motherboards",
        "Drives & Storage",
        "Computer Memory",
        "Computer Cases",
        "Power Supplies",
        "Air & Water Cooling",
        "Gaming PCs",
        "Workstations",
        "Servers"
    }

    def get(self, request, format=None):
        """
        Handles a GET request to retrieve all products
        """
        category = request.query_params.get('category')

        if category is None:
            product_list = Product.objects.all()
        elif category in self.PRODUCT_CATEGORIES:
            product_list = Product.objects.filter(category=category)
        else:
            return Response(
                {'error': 'This category doesn\'t exist'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ProductSerializer(product_list, many=True)

        return Response(
            {'products': serializer.data},
            status=status.HTTP_200_OK
        )


class ProductDetail(APIView):
    """
    Endpoint to get a product detail
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request, id, format=None):
        """
        Handles a GET request to retrieve a product detail
        """
        product = get_object_or_404(Product, id=id)
        serializer = ProductSerializer(product, many=False)
        return Response(
            {'products': serializer.data},
            status=status.HTTP_200_OK
        )