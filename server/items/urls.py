from django.urls import path

from .views import PartList, PartDetail

urlpatterns = [
    path('', PartList.as_view()),
    path('<int:id>', PartDetail.as_view()),
]
