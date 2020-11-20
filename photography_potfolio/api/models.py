from django.db import models

# Create your models here.

class Portfolio(models.Model):
    name = models.CharField(max_length=50, default="", unique=True)
    description = models.CharField(max_length=4000, default="", unique=False)
