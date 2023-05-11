from django.contrib import admin
from .models import UserAccount


@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
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
                    'blacklisted',
                    'is_active',
                    'has_discount',
                    'application_memo',
                ]
            }
        ),
        (
            'Point System',
            {
                'fields': [
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
    )
