import math
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from better_profanity import profanity

from .models import ComputerPart, Product, CustomBuild
from .serializers import ComputerPartSerializer, BuildSerializer


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
            {'product': serializer.data},
            status=status.HTTP_200_OK
        )


class ManageComment(APIView):
    """
    Endpoint to add a comment to a product
    """
    permission_classes = (permissions.AllowAny, )

    def post(self, request, id):
        """
        Handles a PUT request for adding comments
        """
        user = request.user
        product = get_object_or_404(Product, id=id)

        if not user:
            username = user.username
        else:
            username = "Anonymous"

        comment = request.data.get('comment')
        if not comment:
            return Response(
                {'error': 'Please enter a comment in the body'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if profanity.contains_profanity(comment):
            taboo_words = profanity.censor(comment).count("****")
            if user:
                if taboo_words > 3:
                    user.warnings += 2
                else:
                    user.warnings += 1
                user.save()

            return Response(
                {'error': 'Comments must not have profanity'},
                status=status.HTTP_403_FORBIDDEN
            )

        product.comments.create(username=username, comment=comment)
        return Response(status=status.HTTP_201_CREATED)


"""
Build Endpoints
"""


class CheckCompatibility(APIView):
    """
    Endpoint for checking compatibility in build parts
    """

    def validate_part(self, computer_part, category):
        """
        Validate computer part
        """
        if computer_part is None:
            return True
        return computer_part.category == category

    def post(self, request):
        """
        Handles a POST request for checking compatibility
        """
        data = request.data

        cpu_id = data.get('CPU')
        gpu_id = data.get('GPU')
        motherboard_id = data.get('Motherboard')
        ram_id = data.get('RAM')
        case_id = data.get('Case')
        psu_id = data.get('PSU')
        cooling_id = data.get('Cooling')
        storage_id = data.get('Storage')

        cpu = get_object_or_404(
            ComputerPart, id=cpu_id) if cpu_id is not None else None
        gpu = get_object_or_404(
            ComputerPart, id=gpu_id) if gpu_id is not None else None
        motherboard = get_object_or_404(
            ComputerPart, id=motherboard_id) if motherboard_id is not None else None
        ram = get_object_or_404(
            ComputerPart, id=ram_id) if ram_id is not None else None
        computer_case = get_object_or_404(
            ComputerPart, id=case_id) if case_id is not None else None
        psu = get_object_or_404(
            ComputerPart, id=psu_id) if psu_id is not None else None
        cooling = get_object_or_404(
            ComputerPart, id=cooling_id) if cooling_id is not None else None
        storage = get_object_or_404(
            ComputerPart, id=storage_id) if storage_id is not None else None

        if not (self.validate_part(cpu, "CPU") and
                self.validate_part(gpu, "GPU") and
                self.validate_part(motherboard, "Motherboard") and
                self.validate_part(ram, "RAM") and
                self.validate_part(computer_case, "Case") and
                self.validate_part(psu, "PSU") and
                self.validate_part(cooling, "Cooling") and
                self.validate_part(storage, "Storage")):
            return Response(
                {'error': 'At least one of the parts is not of proper category'},
                status=status.HTTP_400_BAD_REQUEST
            )

        incompatibilities = set()

        # CPU and Motherboard Compatibility Check
        if cpu and motherboard:
            if cpu.specs["Socket Type"] != motherboard.specs["Socket Type"]:
                incompatibilities.update(["CPU", "Motherboard"])

        # Motherboard and Case Compatibility Check
        if motherboard and computer_case:
            if motherboard.specs["Form Factor"] not in computer_case.specs["Motherboard Support"]:
                incompatibilities.update(["Case", "Motherboard"])

        # RAM and Motherboard Compatibility Check
        if ram and motherboard:
            if ram.specs["Memory Speed (MHz)"] not in motherboard.specs["Memory Type"]:
                incompatibilities.update(["Memory", "Motherboard"])

        # PSU and GPU Compatibility Check
        if psu and gpu:
            recommended_wattage = int(
                gpu.specs["Recommended Power Supply"].split(' ')[0])
            psu_wattage = int(psu.specs["Wattage"].split(' ')[0])
            if psu_wattage < recommended_wattage:
                incompatibilities.update(["Power Supply", "Video Card"])

        # CPU Cooler Compatibility Check
        if cooling:
            if "Case Fan" in cooling.product_name:
                incompatibilities.add("CPU Cooler")

        return Response(
            {"incompatibilities": list(incompatibilities)},
            status=status.HTTP_200_OK
        )


class ManageBuild(APIView):
    """
    Endpoint to manage builds
    """

    def validate_part(self, computer_part, category):
        """
        Validate computer part
        """
        return computer_part.category == category

    def get(self, request):
        """
        Handles a GET request for retrieving custom builds
        """
        build_list = sorted(CustomBuild.objects.filter(
            visible=True), key=lambda x: x.overall_rating, reverse=True)
        serializer = BuildSerializer(build_list, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request):
        """
        Handles a POST request for adding a build
        """
        data = request.data

        user = request.user

        build_name = data.get('build_name')

        if not build_name:
            return Response(
                {'error': 'Must provide a name for the build'},
                status=status.HTTP_400_BAD_REQUEST
            )

        cpu_id = data.get('CPU')
        gpu_id = data.get('GPU')
        motherboard_id = data.get('Motherboard')
        ram_id = data.get('RAM')
        case_id = data.get('Case')
        psu_id = data.get('PSU')
        cooling_id = data.get('Cooling')
        storage_id = data.get('Storage')

        if not (cpu_id and gpu_id and motherboard_id and ram_id and
                case_id and psu_id and cooling_id and storage_id):
            return Response(
                {'error': 'All parts must be present to make a build'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get Parts
        cpu = get_object_or_404(ComputerPart, id=cpu_id)
        gpu = get_object_or_404(ComputerPart, id=gpu_id)
        motherboard = get_object_or_404(ComputerPart, id=motherboard_id)
        ram = get_object_or_404(ComputerPart, id=ram_id)
        computer_case = get_object_or_404(ComputerPart, id=case_id)
        psu = get_object_or_404(ComputerPart, id=psu_id)
        cooling = get_object_or_404(ComputerPart, id=cooling_id)
        storage = get_object_or_404(ComputerPart, id=storage_id)

        # Verify Part Categories
        if not (self.validate_part(cpu, "CPU") and
                self.validate_part(gpu, "GPU") and
                self.validate_part(motherboard, "Motherboard") and
                self.validate_part(ram, "RAM") and
                self.validate_part(computer_case, "Case") and
                self.validate_part(psu, "PSU") and
                self.validate_part(cooling, "Cooling") and
                self.validate_part(storage, "Storage")):
            return Response(
                {'error': 'At least one of the parts is not of proper category'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Compatibility Check
        incompatibilities = set()

        # CPU and Motherboard
        if cpu.specs["Socket Type"] != motherboard.specs["Socket Type"]:
            incompatibilities.update(["CPU", "Motherboard"])

        # Case and Motherboard
        if motherboard.specs["Form Factor"] not in computer_case.specs["Motherboard Support"]:
            incompatibilities.update(["Case", "Motherboard"])

        # RAM and Motherboard
        if ram.specs["Memory Speed (MHz)"] not in motherboard.specs["Memory Type"]:
            incompatibilities.update(["Memory", "Motherboard"])

        # PSU and GPU
        recommended_wattage = int(
            gpu.specs["Recommended Power Supply"].split(' ')[0])
        psu_wattage = int(psu.specs["Wattage"].split(' ')[0])
        if psu_wattage < recommended_wattage:
            incompatibilities.update(["Power Supply", "Video Card"])

        # CPU Cooler
        if "Case Fan" in cooling.product_name:
            incompatibilities.add("CPU Cooler")

        total_price = sum(
            [
                cpu.price,
                gpu.price,
                motherboard.price,
                ram.price,
                computer_case.price,
                psu.price,
                cooling.price,
                storage.price
            ]
        )

        build = CustomBuild.objects.create(
            product_name=build_name, price=total_price, builder=user)
        build.parts.add(cpu, gpu, motherboard, ram,
                        computer_case, psu, cooling, storage)
        build.save()

        return Response(status=status.HTTP_201_CREATED)


class ManageRating(APIView):
    """
    Endpoint to manage build ratings
    """

    def post(self, request, id):
        """
        Handles a POST request to add a rating to a build
        """
        rating = request.data.get('rating')

        if not rating:
            return Response(
                {'error': 'Must provide a rating for the build'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if 1 > rating > 5 and not isinstance(rating, int):
            return Response(
                {'error': 'Rating must be between 1 and 5 inclusive and it must be an integer'},
                status=status.HTTP_400_BAD_REQUEST
            )

        build = get_object_or_404(CustomBuild, id=id)
        ratings = build.ratings

        ratings["ratings_list"].append(rating)
        ratings["avg_ratings"] = (ratings["avg_ratings"] * \
            ratings["num_ratings"] + rating) / (ratings["num_ratings"] + 1)
        ratings["num_ratings"] += 1
        ratings["best_rating_count"] += 1 if rating == 5 else 0
        ratings["worst_rating_count"] += 1 if rating == 1 else 0

        build.ratings = ratings
        build.save()

        if build.ratings["best_rating_count"] == 3 and build.ratings["worst_rating_count"] == 0:
            build.builder.compliments += 1
            build.builder.save()

        if build.ratings["best_rating_count"] == 0 and build.ratings["worst_rating_count"] == 3:
            build.builder.warnings += 1
            build.builder.save()

        return Response(
            {'success': 'Rating has been added'},
            status=status.HTTP_200_OK
        )
