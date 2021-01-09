from django.db import models
from django.core.files.storage import FileSystemStorage


# Create your models here.
def upload_path(instance, filename):
    return '/'.join(['images', str(instance.imageName), filename])


class Portfolio(models.Model):
    portfolioName = models.CharField(max_length=50, default="", unique=True)
    description = models.CharField(max_length=4000, default="", unique=False)


class Picture(models.Model):
    imageName = models.CharField(max_length=255, unique=True)
    portfolioName = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, null=True, upload_to=upload_path)
