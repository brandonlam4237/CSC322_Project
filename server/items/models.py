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

    objects = models.Manager()


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

    objects = models.Manager()

    def __str__(self) -> str:
        return f"{self.brand} - {self.product_name}"


class ComputerPart(Product):
    """
    ComputerPart Model

    Fields
    ------
    category : CharField
        Category of part
    image_url: URLField
        Image URL of part
    product_sku: IntegerField
    manufacturer_part_number: CharField
    upc_number: CharField
    specs: JSONField
        Specifications of computer part
    """

    class Category(models.TextChoices):
        """
        Categories of Item
        """
        CPU = "CPU", "Processors/CPUs"
        GPU = "GPU", "Graphics Cards"
        MOTHERBOARD = "Motherboard", "Motherboards"
        STORAGE = "Storage", "Drives & Storage"
        RAM = "RAM", "Computer Memory"
        CASE = "Case", "Computer Cases"
        PSU = "PSU", "Power Supplies"
        COOLING = "Cooling", "Air & Water Cooling"
        DESKTOP_COMPUTER = "Desktop", "Desktop Computers"

    category = models.CharField(
        max_length=20, choices=Category.choices, null=False)

    image_url = models.URLField(max_length=200, null=False)
    product_sku = models.IntegerField(null=False)
    manufacturer_part_number = models.CharField(max_length=100, null=False)
    upc_number = models.CharField(max_length=20, null=False)
    specs = models.JSONField(null=False)


class CustomBuild(Product):
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
    parts = models.ManyToManyField(ComputerPart, related_name="build_parts")

    objects = models.Manager()

    def __str__(self) -> str:
        return f"{self.build_maker.username} - {self.product_name}"


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
    items = models.ManyToManyField(Product, related_name='order_items')

    datetime_ordred = models.DateTimeField(auto_now_add=True, null=False)
    total_price = models.DecimalField(
        max_digits=50, decimal_places=2, null=False)

    objects = models.Manager()


class Cart(models.Model):
    """
    Shopping Cart Model

    Fields
    ------
    customer : OneToOneField
        Customer who owns the shopping cart
    """
    customer = models.OneToOneField(User, on_delete=models.CASCADE, null=False)

    objects = models.Manager()

    @property
    def total_price(self):
        cartitems = self.cart_items.all()
        total = sum([item.price for item in cartitems])
        return total

    @property
    def num_items(self):
        cartitems = self.cart_items.all()
        quantity = sum([item.quantity for item in cartitems])
        return quantity


class CartItem(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='items')
    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.IntegerField(default=0)

    objects = models.Manager()

    def __str__(self):
        return self.product.product_name

    @property
    def price(self):
        new_price = self.product.price * self.quantity
        return new_price
