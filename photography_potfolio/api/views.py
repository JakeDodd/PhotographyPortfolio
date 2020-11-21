from django.shortcuts import render
from rest_framework import generics, status
from .serializers import PortfolioSerializer, PictureSerializer
from .models import Portfolio, Picture
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class PortfolioView(generics.CreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


class PostPictureView(APIView):
    serializer_class = PictureSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            portfolioId = serializer.data.get('portfolio')
            image = serializer.data.get('image')

            queryset = Picture.objects.filter(name=name)
            if queryset.exists():
                return Response({'Bad Request': 'There is already an image with this name'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                portfolio = Portfolio.objects.get(pk=portfolioId)
                picture = Picture(name=name, portfolio=portfolio, image=image)
                picture.save()
                return Response(PictureSerializer(picture).data, status=status.HTTP_201_CREATED)
        return Respone({'Bad Request': 'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)
