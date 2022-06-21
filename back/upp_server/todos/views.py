from django.shortcuts import render, get_list_or_404, redirect
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from todos import serializers

from .models import Todo, Tag
from .serializers import TodoSerializer, TagSerializer, TodoTagSerializer

# Create your views here.
@api_view(['GET'])
def index(request):
  todos = Todo.objects.order_by('-pk')
  serializer = TodoSerializer(todos, many=True)
  context = {
    'todos' : todos
  }
  return Response(serializer.data)

@api_view(['POST'])
def create(request):
  serializer = TodoSerializer(data=request.data)
  if serializer.is_valid(raise_exception=True):
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def detail(request, todo_pk):
  todo = Todo.objects.get(pk=todo_pk)
  serializer = TodoSerializer(todo, data=request.data)
  context = {
    'todo': todo
  }
  return Response(serializer.data)

@api_view(['PUT'])
def update(request, todo_pk):
  todo = Todo.objects.get(pk=todo_pk)
  # if request.user == todo.user:
  serializer = TodoSerializer(todo, data=request.data)
  print(request.data, "수정할 데이터 정보")
  if serializer.is_valid(raise_exception=True):
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  # return Response({'Unautorized': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['DELETE'])
def delete(request, todo_pk):
  # if request.user == todo.user:
  todo = Todo.objects.get(pk=todo_pk)
  todo.delete()
  data = {
    'delete' : f'{todo_pk}번 리뷰가 삭제되었습니다.'
  }
  return Response(data, status=status.HTTP_204_NO_CONTENT)
  # return Response({'Unautorized': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)