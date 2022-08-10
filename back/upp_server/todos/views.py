from tokenize import Number
from django.shortcuts import render, get_list_or_404, redirect
# from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework import status
from messages import TM000, TM001, TM002
from utils import make_json_response, check_token_in_header

# from todos import serializers

from .models import Todo
from .serializers import TodoSerializer

# Create your views here.
@api_view(['GET'])
def index(request):
    token = request.headers.get('Authorization')
    date = request.GET['date']
    if token != 'null' and date != 'null':
        result = check_token_in_header(token)

        if type(result) is int:
            todos = Todo.objects.filter(user_id=result, date=date)
            serializer = TodoSerializer(todos, many=True)
            return Response(serializer.data)
        elif result.get('jwt'):
            return make_json_response(result, 403)

    return make_json_response({'message': TM002}, 403)

@api_view(['POST'])
def create(request):
    token = request.headers.get('Authorization')
    if token != 'null':
      result = check_token_in_header(token)
      if type(result) is int:
          serializer = TodoSerializer(data={'user':result, 'date': request.data["date"], 'content': request.data['content'], 'done': request.data["done"]})

          if serializer.is_valid(raise_exception=True):
              serializer.save()
              # return Response(serializer.data, status=status.HTTP_201_CREATED)
              return make_json_response({'data': serializer.data, 'message': TM000})
      elif result.get('jwt'):
          return make_json_response(result, 403)
    
    return make_json_response({'message': TM002}, 403)

@api_view(['GET'])
def detail(request, todo_pk):
    token = request.headers.get('Authorization')
    if token != 'null':
        todo = Todo.objects.get(pk=todo_pk)
        serializer = TodoSerializer(todo, data=request.data)
        return Response(serializer.data)
    return make_json_response({'message': TM002}, 403)

@api_view(['PUT'])
def update(request, todo_pk):
  todo = Todo.objects.get(pk=todo_pk)
  token = request.headers.get('Authorization')
  if token != 'null':
    result = check_token_in_header(token)

    if result == todo.user_id:
        if type(result) is int:
            serializer = TodoSerializer(todo, data={'user':result, 'date': request.data["date"], 'content': request.data['content'], 'done': request.data["done"]})
            # print(request.data, "수정할 데이터 정보")
            if serializer.is_valid(raise_exception=True):
              serializer.save()
              # return Response(serializer.data, status=status.HTTP_201_CREATED)
              return make_json_response({'data': serializer.data, 'message': TM000})
        elif result.get('jwt'):
            return make_json_response(result, 403)
      
  return make_json_response({'message': TM002}, 403)

@api_view(['DELETE'])
def delete(request, todo_pk):
  todo = Todo.objects.get(pk=todo_pk)
  token = request.headers.get('Authorization')
  result = check_token_in_header(token)

  if result == todo.user_id:
      if type(result) is int:
          todo.delete()
          data = {
            'delete' : f'{todo_pk}번 리뷰가 삭제되었습니다.'
          }
          return make_json_response({'result': data, 'message': TM001})
      elif result.get('jwt'):
          return make_json_response(result, 403)
  return make_json_response({'data': TM002}, 403)