from django.contrib import admin
from django.apps import apps

# Register your models here.
item_models = apps.get_app_config('items').get_models()

for model in item_models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
