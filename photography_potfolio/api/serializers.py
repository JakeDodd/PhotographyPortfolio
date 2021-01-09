from rest_framework import serializers
from .models import Portfolio, Picture


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('portfolioName', 'description')


class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ('imageName', 'portfolioName', 'image')
