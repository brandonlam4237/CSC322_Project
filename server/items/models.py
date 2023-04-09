from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Comment(models.Model):
    """
    Comment Model
    """
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    comment = models.TextField(null=False)
    showing = models.BooleanField(default=True)


class ComputerPart(models.Model):
    """
    Item Model
    """

    class Category(models.TextChoices):
        """
        Categories of Item
        """
        CPU = "CPU", "Processors/CPUs"
        GPU = "GPU", "Graphics Cards"
        MOTHERBOARD = "MOTHERBOARD", "Motherboards"
        STORAGE = "STORAGE", "Drives & Storage"
        RAM = "RAM", "Computer Memory"
        CASE = "CASE", "Computer Cases"
        PSU = "PSU", "Power Supplies"
        COOLING = "COOLING", "Air & Water Cooling"

    class DesktopTypes(models.TextChoices):
        """
        Categories of Desktop Types
        """
        GAMING_PC = "GAME", "Gaming PCs"
        WORKSTATION = "WORK", "Workstations"
        SERVER = "SERVER", "Servers"

    brand = models.CharField(max_length=100, null=False)
    product_name = models.CharField(max_length=255, null=False)

    category = models.CharField(
        max_length=20, choices=Category.choices, null=False)
    desktop_type = models.CharField(
        max_length=20, choices=DesktopTypes.choices, null=True)

    price = models.DecimalField(max_digits=7, decimal_places=2, null=False)

    product_sku = models.IntegerField(null=False)
    manufacturer_part_number = models.CharField(max_length=100, null=False)
    upc_number = models.PositiveBigIntegerField(null=False)

    specs = models.JSONField(null=False)

    comments = models.ManyToManyField(Comment)


class CustomBuild(models.Model):
    """
    Custom Build Model
    """
    build_maker = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    parts = models.ManyToManyField(ComputerPart)


class Order(models.Model):
    """
    Order Model
    """
    customer = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    address = models.TextField(null=False)
    items = models.JSONField()

    date_ordred = models.DateTimeField(auto_now_add=True, null=False)
    total_price = models.DecimalField(
        max_digits=50, decimal_places=2, null=False)


class ShoppingCart(models.Model):
    """
    Shopping Cart Model
    """
    customer = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
    items = models.JSONField()
