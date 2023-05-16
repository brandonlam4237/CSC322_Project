from django.contrib import admin
from .models import UserAccount
from .models import Protest


@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    """
    Admin Panel for User Accounts
    """
    fieldsets = [
        (
            'User Detail',
            {
                'fields': [
                    'date_created',
                    'username',
                    'email',
                    ('first_name', 'last_name',),
                    'balance',
                ]
            }
        ),
        (
            'Authentication',
            {
                'classes': ['extrapretty'],
                'fields': [
                    ('blacklisted', 'is_active',),
                    ('rejected', 'protested',),
                    'application_memo',
                ]
            }
        ),
        (
            'Point System',
            {
                'fields': [
                    'has_discount',
                    'warnings',
                    'compliments',
                    'position_tier',
                ]
            }
        ),
    ]
    readonly_fields = (
        'balance',
        'date_created',
        'username',
        'email',
    )
    search_fields = (
        'username',
        'email',
    )


@admin.register(Protest)
class ProtestAdmin(admin.ModelAdmin):
    """
    Admin panel for protests
    """
    list_display = (
        'protestor',
        'reviewed',
    )
    fields = (
        'protestor',
        'reviewed',
        'datetime_protested',
    )
    readonly_fields = (
        'datetime_protested',
        'protestor',
    )
    search_fields = (
        'protestor',
    )
    list_filter = ('reviewed',)
