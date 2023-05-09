from django.urls import path

from .views import PartList, PartDetail
from .views import ManageComment
from .views import CheckCompatibility, ManageBuild, ManageRating

urlpatterns = [
    # Part URLs
    path('', PartList.as_view()),
    path('<int:id>', PartDetail.as_view()),

    # Comment URLs
    path('comments/<int:id>', ManageComment.as_view()),

    # Build URLs
    path('builds', ManageBuild.as_view()),
    path('builds/compatibility', CheckCompatibility.as_view()),
    path('builds/rate/<int:id>', ManageRating.as_view()),
]
