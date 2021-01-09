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


class PostPictureView(APIView):
    serializer_class = PictureSerializer

    def post(self, request, format=None):
        imageName = request.data['imageName']
        portfolioName = request.data['portfolioName']
        image = request.data['image']
        portfolio = Portfolio.objects.filter(portfolioName=portfolioName).get()
        Picture.objects.create(imageName=imageName,
                               portfolioName=portfolio, image=image)
        return HttpResponse({'message': 'Picture created'}, status=200)


class GetPicturesByPortfolio(APIView):
    serializer_class = PictureSerializer
    lookup_url_kwarg = 'Portfolio'

    def get(self, request, format=None):
        portfolio = request.GET.get(self.lookup_url_kwarg)
        if portfolio != None:
            images = Picture.objects.filter(
                portfolioName=Portfolio.objects.get(portfolioName=portfolio))
            if len(images) > 0:
                data = PictureSerializer(images, many=True).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'No Images Found': 'Invalid Portfolio'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Portfolio parameter not found'}, status=status.HTTP_400_BAD_REQUEST)
