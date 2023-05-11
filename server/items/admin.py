from django.contrib import admin

from .models import Comment, Product
from .models import ComputerPart, CustomBuild
from .models import Cart, CartItem
from .models import Order


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    """
    Customized admin panel for Comment
    """
    list_display = ('username',)
    ordering = ('-datetime_added',)
    search_fields = ('username',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Customized admin panel for Product
    """
    list_display = (
        'product_name',
        'brand'
    )
    fields = (
        ('brand', 'product_name'),
        'price',
        'comments',
    )
    list_filter = ('brand',)
    search_fields = ('product_name',)


@admin.register(ComputerPart)
class ComputerPartAdmin(admin.ModelAdmin):
    """
    Customized admin panel for ComputerPart
    """
    list_display = (
        'product_name',
        'brand'
    )
    fields = (
        ('brand', 'product_name'),
        'price',
        'image_url',
        'category',
        ('product_sku', 'manufacturer_part_number', 'upc_number',),
        'comments',
        'specs',
    )
    readonly_fields = (
        'specs',
    )
    list_filter = ('brand',)
    search_fields = ('product_name',)


@admin.register(CustomBuild)
class CustomBuildAdmin(admin.ModelAdmin):
    """
    Customized admin panel for CustomBuild
    """
    list_display = ('product_name',)
    fields = (
        ('brand', 'product_name'),
        'price',
        ('builder', 'visible',),
        'parts',
    )
    list_filter = ('visible',)
    search_fields = ('product_name',)


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    """
    Customized admin panel for Cart
    """
    fields = ('customer',)
    search_fields = ('customer',)


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    """
    Customized admin panel for CartAdmin
    """
    fields = (
        'product',
        'cart',
        'quantity'
    )
    search_fields = ('product',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """
    Customized admin panel for Order
    """
    fields = (
        'customer',
        'address',
        'total_price',
        'datetime_ordered',
        'items',
    )
    readonly_fields = ('datetime_ordered',)
    search_fields = ('customer',)
