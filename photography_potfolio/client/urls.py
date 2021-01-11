from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('Gallery/<str:portfolio>', index),
    path('Contact', index),
    path('About', index),
    path('ImportImage', index),
]
