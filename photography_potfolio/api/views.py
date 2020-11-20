from django.shortcuts import render
from rest_framework import generics
from .serializers import PortfolioSerializer
from .models import Portfolio

# Create your views here.

class PortfolioView(generics.ListAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer