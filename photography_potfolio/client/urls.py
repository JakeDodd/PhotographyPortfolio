from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('Gallery', index),
    path('Contact', index),
    path('About', index),
    path('ImportImage', index),
]
