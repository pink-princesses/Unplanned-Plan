from rest_framework import serializers
from .models import Todo, Tag

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = '__all__'