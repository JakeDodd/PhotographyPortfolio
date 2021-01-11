from django.urls import path
from .views import PortfolioView, PostPictureView, GetPicturesByPortfolio, PostPortfolioView

urlpatterns = [
    path('/portfolio', PortfolioView.as_view()),
    path('/post-image', PostPictureView.as_view()),
    path('/get-images', GetPicturesByPortfolio.as_view()),
    path('/post-portfolio', PostPortfolioView.as_view())
]
