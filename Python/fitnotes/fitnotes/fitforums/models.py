from django.db import models

# Create your models here.

class Comment(models.Model):
    comment = models.TextField()
    by = models.CharField()
    
class Disscussion(models.Model):
    comments = models.m