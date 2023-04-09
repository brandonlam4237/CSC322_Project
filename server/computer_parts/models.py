from django.db import models

# Create your models here.


class ComputerPart(models.Model):
    """
    Computer Part Model
    """

    class Category(models.TextChoices):
        """
        Categories of Parts
        """
        CPU = "CPU", "Processors/CPUs"
        GPU = "GPU", "Graphics Cards"
        MOTHERBOARD = "MOTHERBOARD", "Motherboards"
        STORAGE = "STORAGE", "Drives & Storage"
        RAM = "RAM", "Computer Memory"
        CASE = "CASE", "Computer Cases"
        PSU = "PSU", "Power Supplies"
        COOLING = "COOLING", "Air & Water Cooling"

    brand = models.CharField(max_length=100, null=False)
    product_name = models.CharField(max_length=255, null=False)

    category = models.CharField(
        max_length=20, choices=Category.choices, null=False)

    price = models.DecimalField(max_digits=7, decimal_places=2, null=False)

    product_sku = models.IntegerField(null=False)
    manufacturer_part_number = models.CharField(max_length=100, null=False)
    upc_number = models.PositiveBigIntegerField(null=False)

    specs = models.JSONField(null=False)
