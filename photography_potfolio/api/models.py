from django.db import models
from django.core.files.storage import FileSystemStorage

fs = FileSystemStorage(location='/static/images')

# Create your models here.


class Portfolio(models.Model):
    name = models.CharField(max_length=50, default="", unique=True)
    description = models.CharField(max_length=4000, default="", unique=False)


class Picture(models.Model):
    name = models.CharField(max_length=255, unique=True)
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    image = models.ImageField(storage=fs)
