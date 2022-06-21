from rest_framework import serializers
from .models import Todo, Tag

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = '__all__'

class TodoTagSerializer(serializers.ModelSerializer):
  tags = TagSerializer(many=True, read_only=True)
  class Meta:
    model = Todo
    fields = '__all__'