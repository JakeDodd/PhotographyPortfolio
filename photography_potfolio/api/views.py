from django.shortcuts import render
from rest_framework import generics, status
from .serializers import PortfolioSerializer, PictureSerializer
from .models import Portfolio, Picture
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse

# Create your views here.


class PortfolioView(generics.CreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer


class PostPictureView(APIView):
    serializer_class = PictureSerializer

    def post(self, request, format=None):
        name = request.data['name']
        image = request.data['image']
        Picture.objects.create(name=name, image=image)
        return HttpResponse({'message': 'Picture created'}, status=200)
