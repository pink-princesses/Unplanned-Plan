from django.shortcuts import render, get_list_or_404, redirect
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from messages import TM000
from utils import make_json_response, check_token_in_header

from todos import serializers

from .models import Todo
from .serializers import TodoSerializer

# Create your views here.
@api_view(['GET'])
def index(request):
  token = request.headers.get('Authorization')
  if token:
    userInfo = check_token_in_header(token)
    todos = Todo.objects.filter(user_id=userInfo).order_by('-pk')
    serializer = TodoSerializer(todos, many=True)
    context = {
      'todos' : todos
    }
    return Response(serializer.data)
  return Response({'Unautorized': '유저 정보가 존재하지 않습니다.'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def create(request):
  token = request.headers.get('Authorization')
  if token:
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response({'Unautorized': '유저 정보가 존재하지 않습니다.'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def detail(request, todo_pk):
  token = request.headers.get('Authorization')
  if token:
    todo = Todo.objects.get(pk=todo_pk)
    serializer = TodoSerializer(todo, data=request.data)
    context = {
      'todo': todo
    }
    return Response(serializer.data)
  return Response({'Unautorized': '유저 정보가 존재하지 않습니다.'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['PUT'])
def update(request, todo_pk):
  todo = Todo.objects.get(pk=todo_pk)
  token = request.headers.get('Authorization')
  userInfo = check_token_in_header(token)

  if userInfo == todo.user_id:
    serializer = TodoSerializer(todo, data=request.data)
    print(request.data, "수정할 데이터 정보")
    
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response({'Unautorized': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['DELETE'])
def delete(request, todo_pk):
  todo = Todo.objects.get(pk=todo_pk)
  token = request.headers.get('Authorization')
  userInfo = check_token_in_header(token)

  if userInfo == todo.user:
    todo.delete()
    data = {
      'delete' : f'{todo_pk}번 리뷰가 삭제되었습니다.'
    }
    return Response(data, status=status.HTTP_204_NO_CONTENT)

  return Response({'Unautorized': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)