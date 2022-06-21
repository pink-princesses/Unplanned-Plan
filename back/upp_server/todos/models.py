from django.db import models

# Create your models here.

class Tag(models.Model):
  name = models.CharField(max_length=20)
  color = models.CharField(max_length=7)


class Todo(models.Model):
  content = models.CharField(max_length=100)
  # date = models.DateTimeField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  done = models.BooleanField(default=False)
