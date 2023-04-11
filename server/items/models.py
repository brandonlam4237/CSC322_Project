from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Comment(models.Model):
    """
    Comment Model

    Fields
    ------
    user : ForeignKey
        User who posted the comment
    comment : TextField
        Comment content
    visible : BooleanField
        Boolean to indicate if the comment is visible
    """
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    comment = models.TextField(null=False)
    visible = models.BooleanField(default=True)


class Product(models.Model):
    """
    Product Model

    Fields
    ------
    brand : CharField
        Brand of the product
    product_name : CharField
        Name of the product
    price : DecimalField
        Price of the product
    comments : ManyToManyField
        Comments about the product
    """
    brand = models.CharField(max_length=100, default="DP", null=False)
    product_name = models.CharField(max_length=255, null=False)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=False)
    comments = models.ManyToManyField(Comment, blank=True)


class ComputerPart(Product):
    """
    Computer Part Model

    Fields
    ------
    category : CharField
        Category of the computer part
    product_sku : IntegerField
        Stock keeping unit number
    upc_number : PositiveBigIntegerField
        Universal Product Code number
    specs : JSON Field
        JSON Object of specifications of the computer part
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

    category = models.CharField(
        max_length=20, choices=Category.choices, null=False)

    product_sku = models.IntegerField(null=False)
    manufacturer_part_number = models.CharField(max_length=100, null=False)
    upc_number = models.PositiveBigIntegerField(null=False)
    specs = models.JSONField(null=False)


class Computer(Product):
    """
    Computer Model

    Fields
    ------
    category : CharField
        Category of the computer
    product_sku : IntegerField
        Stock keeping unit number
    upc_number : PositiveBigIntegerField
        Universal Product Code number
    specs : JSON Field
        JSON Object of specifications of the computer
    """
    class DesktopTypes(models.TextChoices):
        """
        Categories of Desktop Types
        """
        GAMING_PC = "GAME", "Gaming PCs"
        WORKSTATION = "WORK", "Workstations"
        SERVER = "SERVER", "Servers"

    category = models.CharField(
        max_length=20, choices=DesktopTypes.choices, null=False)

    product_sku = models.IntegerField(null=False)
    manufacturer_part_number = models.CharField(max_length=100, null=False)
    upc_number = models.PositiveBigIntegerField(null=False)
    specs = models.JSONField(null=False)


class CustomBuild(models.Model):
    """
    Custom Build Model

    Fields
    ------
    build_maker : ForeignKey
        User who made the build
    build_name : CharField
        A unique name for the build
    parts : ManyToManyField
        Parts the Custom Build Takes
    """
    build_maker = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    build_name = models.CharField(max_length=50, unique=True, null=False)
    parts = models.ManyToManyField(ComputerPart)


class Order(models.Model):
    """
    Order Model

    Fields
    ------
    customer : ForeignKey
        Customer who made the order
    address : TextField
        Address of the order
    items : ManyToManyField
        Items that are in the order
    datetime_ordered : DateTimeField
        Datetime the order was created
    """
    customer = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    address = models.TextField(null=False)
    items = models.ManyToManyField(Product, related_name='order_list')

    datetime_ordred = models.DateTimeField(auto_now_add=True, null=False)
    total_price = models.DecimalField(
        max_digits=50, decimal_places=2, null=False)


class ShoppingCart(models.Model):
    """
    Shopping Cart Model

    Fields
    ------
    customer : OneToOneField
        Customer who owns the shopping cart
    items : ManyToManyField
        Items within the shopping cart
    """
    customer = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
    items = models.ManyToManyField(
        Product, related_name='shopping_list', blank=True)
