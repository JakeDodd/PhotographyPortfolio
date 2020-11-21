from django.urls import path
from .views import PortfolioView, PostPictureView

urlpatterns = [
    path('/portfolio', PortfolioView.as_view()),
    path('/post-image', PostPictureView.as_view())
]
