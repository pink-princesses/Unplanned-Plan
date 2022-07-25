from django.db import models
from django.conf import settings

# Create your models here.

class Tag(models.Model):
  name = models.CharField(max_length=20)
  color = models.CharField(max_length=7)


class Todo(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  date = models.CharField(max_length=10)
  content = models.CharField(max_length=100)
  done = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)