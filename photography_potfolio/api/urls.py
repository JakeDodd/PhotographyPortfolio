from django.urls import path
from .views import PortfolioView, PostPictureView, GetPicturesByPortfolio, PostPortfolioView, DeletePortfolio

urlpatterns = [
    path('/portfolio', PortfolioView.as_view()),
    path('/post-image', PostPictureView.as_view()),
    path('/get-images', GetPicturesByPortfolio.as_view()),
    path('/post-portfolio', PostPortfolioView.as_view()),
    path('/delete-portfolio', DeletePortfolio.as_view())
]
