from django.shortcuts import render
from rest_framework import generics, status
from .serializers import PortfolioSerializer, PictureSerializer
from .models import Portfolio, Picture
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse

# Create your views here.


class PortfolioView(generics.ListCreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


class PostPortfolioView(APIView):
    serializer_class = PortfolioSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            portfolioName = serializer.data.get('portfolioName')
            description = serializer.data.get('description')
            portfolioExists = Portfolio.objects.filter(
                portfolioName=portfolioName).exists()
            if not portfolioExists:
                Portfolio.objects.create(
                    portfolioName=portfolioName, description=description)
                return HttpResponse({'message: Portfolio created'}, status=status.HTTP_201_CREATED)
            return HttpResponse({'message: Duplicate Portfolio'}, status=status.HTTP_400_BAD_REQUEST)
        return HttpResponse({'message: Bad Portfolio Data'}, status=status.HTTP_400_BAD_REQUEST)


class PostPictureView(APIView):
    serializer_class = PictureSerializer

    def post(self, request, format=None):
        portfolioName = request.data['portfolioName']
        portfolio = Portfolio.objects.filter(
            portfolioName=portfolioName).get()
        imageName = request.data['imageName']
        image = request.data['image']
        serializer = self.serializer_class(
            data={'imageName': imageName, 'portfolioName': portfolio, 'image': image})
        if serializer.is_valid():
            Picture.objects.create(imageName=imageName,
                                   portfolioName=portfolio, image=image)
            return HttpResponse({'message': 'Picture created'}, status=status.HTTP_201_CREATED)
        return HttpResponse({'Bad Request': 'Bad Image data'}, status=status.HTTP_400_BAD_REQUEST)


class GetPicturesByPortfolio(APIView):
    serializer_class = PictureSerializer
    lookup_url_kwarg = 'portfolio'

    def get(self, request, format=None):
        portfolio = request.GET.get(self.lookup_url_kwarg)
        if portfolio != None:
            images = Picture.objects.filter(
                portfolioName=Portfolio.objects.get(portfolioName=portfolio))
            if len(images) > 0:
                data = PictureSerializer(images, many=True).data
                return Response(data, status=status.HTTP_200_OK)
            return HttpResponse({'No Images Found': 'Invalid Portfolio'}, status=status.HTTP_404_NOT_FOUND)
        return HttpResponse({'Bad Request': 'Portfolio parameter not found'}, status=status.HTTP_400_BAD_REQUEST)


class DeletePortfolio(APIView):
    serializer_class = PortfolioSerializer

    def delete(self, request, format=None):
        portfolioName = request.data['portfolioName']
        portfolio = Portfolio.objects.filter(portfolioName=portfolioName)
        if portfolio.exists():
            portfolio.delete()
            return HttpResponse({'message': 'Portfolio Deleted'}, status=status.HTTP_200_OK)
        return HttpResponse({'Not Found': 'Invalid Portfolio Name'}, status=status.HTTP_404_NOT_FOUND)
