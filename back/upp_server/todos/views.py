from rest_framework.response import Response
from rest_framework.decorators import api_view
from messages import *
from utils import make_json_response, check_jwt_token, check_exist_empty_token
from .models import Todo
from .serializers import TodoSerializer


EMPTY = 'null'


@api_view(['GET'])
def index(request):
    jwt_token = request.headers.get('jwt')
    refresh_token = request.headers.get('refresh')

    result = check_exist_empty_token(jwt_token, refresh_token)
    if result == AM001 or result == AM003 or result == AM005:
        return make_json_response(result, 403)
    
    todos = Todo.objects.filter(user_id=result.get('user_id'), date=request.GET['date']).order_by('-pk')

    result = TM002
    result['data'] = TodoSerializer(todos, many=True).data
    return make_json_response(result, 200)


def get_todos(request, first_date, last_date):
    jwt_token = request.headers.get('jwt')
    refresh_token = request.headers.get('refresh')

    result = check_exist_empty_token(jwt_token, refresh_token)
    if result == AM001 or result == AM003 or result == AM005:
        return make_json_response(result, 403)
    
    todos = Todo.objects.filter(user_id=result.get('user_id'), date__gte=first_date, date__lte=last_date).order_by('-date', '-pk')

    result = TM002
    result['data'] = TodoSerializer(todos, many=True).data
    return make_json_response(result, 200)


@api_view(['POST'])
def create(request):
  token = request.headers.get('jwt')
  if token != EMPTY:
    userInfo = check_jwt_token(token)
    serializer = TodoSerializer(data={'user':userInfo, 'date': request.data["date"], 'content': request.data['content'], 'done': request.data["done"]})
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return make_json_response({'data': serializer.data, 'message': TM000})
  return make_json_response({'message': TM002}, 403)


@api_view(['GET'])
def detail(request, todo_pk):
    jwt_token = request.headers.get('jwt')
    refresh_token = request.headers.get('refresh')
    if jwt_token != EMPTY:
        result = check_jwt_token(jwt_token, refresh_token)
        if result.get('user_id'):
            todo = Todo.objects.get(pk=todo_pk)
            serializer = TodoSerializer(todo, data=request.data)
            if result.get('user_id'):
                return Response(serializer.data)
            else:
                data = {
                  'data': serializer.data,
                  'jwt': result.get('jwt')
                }
                return make_json_response(data, 403)
    return make_json_response({'message': TM002}, 403)


@api_view(['PUT'])
def update(request, todo_pk):
  todo = Todo.objects.get(pk=todo_pk)
  token = request.headers.get('jwt')
  if token != EMPTY:
    userInfo = check_jwt_token(token)

    if userInfo == todo.user_id:
      serializer = TodoSerializer(todo, data={'user':userInfo, 'date': request.data["date"], 'content': request.data['content'], 'done': request.data["done"]})
      print(request.data, "수정할 데이터 정보")
      
      if serializer.is_valid(raise_exception=True):
        serializer.save()
        return make_json_response({'data': serializer.data, 'message': TM000})
  return make_json_response({'message': TM002}, 403)


@api_view(['DELETE'])
def delete(request, todo_pk):
  todo = Todo.objects.get(pk=todo_pk)
  token = request.headers.get('jwt')
  userInfo = check_jwt_token(token)

  if userInfo == todo.user:
    todo.delete()
    data = {
      'delete' : f'{todo_pk}번 리뷰가 삭제되었습니다.'
    }
    return make_json_response({'result': data, 'message': TM001})
  return make_json_response({'data': TM002}, 403)