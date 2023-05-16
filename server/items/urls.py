from django.urls import path

from .views import PartList, PartDetail
from .views import ManageComment
from .views import CheckCompatibility, ManageRating, GetBuildDetail
from .views import CreateBuild, GetBuilds

urlpatterns = [
    # Part URLs
    path('', PartList.as_view()),
    path('<int:id>', PartDetail.as_view()),

    # Comment URLs
    path('comments/<int:id>', ManageComment.as_view()),

    # Build URLs
    path('builds', GetBuilds.as_view()),
    path('builds/create', CreateBuild.as_view()),
    path('builds/<int:build_id>', GetBuildDetail.as_view()),
    path('builds/compatibility', CheckCompatibility.as_view()),
    path('builds/rate/<int:id>', ManageRating.as_view()),
]
