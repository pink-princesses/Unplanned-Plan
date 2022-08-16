from rest_framework.response import Response
from rest_framework.decorators import api_view
from messages import *
from utils import make_json_response, check_jwt_token, check_exist_empty_token
from .models import Todo
from .serializers import TodoSerializer


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


@api_view(['GET'])
def detail(request, todo_pk):
    token = request.headers.get('Authorization')
    if token != 'null':
        todo = Todo.objects.get(pk=todo_pk)
        serializer = TodoSerializer(todo, data=request.data)
        return Response(serializer.data)
    return make_json_response({'message': TM002}, 403)

@api_view(['POST'])
def create(request):
    jwt_token = request.headers.get('jwt')
    refresh_token = request.headers.get('refresh')

    result = check_exist_empty_token(jwt_token, refresh_token)
    if result == AM001 or result == AM003 or result == AM005:
        return make_json_response(result, 403)
    
    userInfo = result.get('user_id')
    serializer = TodoSerializer(data={'user':userInfo, 'date': request.data["date"], 'content': request.data['content'], 'done': request.data["done"]})
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return make_json_response(TM000, 200)
    return make_json_response(TM002, 403)


@api_view(['GET'])
def detail(request, todo_pk):
    jwt_token = request.headers.get('jwt')
    refresh_token = request.headers.get('refresh')

    result = check_exist_empty_token(jwt_token, refresh_token)
    if result == AM001 or result == AM003 or result == AM005:
        return make_json_response(result, 403)
        
    todo = Todo.objects.get(pk=todo_pk)

    result = TM002
    result['data'] = TodoSerializer(todo, data=request.data).data
    return make_json_response(result, 403)


@api_view(['PUT'])
def update(request, todo_pk):
    jwt_token = request.headers.get('jwt')
    refresh_token = request.headers.get('refresh')

    result = check_exist_empty_token(jwt_token, refresh_token)
    if result == AM001 or result == AM003 or result == AM005:
        return make_json_response(result, 403)

    todo = Todo.objects.get(pk=todo_pk)

    if result.get('user_id') == todo.user_id:
        serializer = TodoSerializer(todo, data={'user':result.get('user_id'), 'date': request.data["date"], 'content': request.data['content'], 'done': request.data["done"]})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return make_json_response(TM000, 200)
    else:
        return make_json_response(TM002, 403)
    


@api_view(['DELETE'])
def delete(request, todo_pk):
    jwt_token = request.headers.get('jwt')
    refresh_token = request.headers.get('refresh')

    result = check_exist_empty_token(jwt_token, refresh_token)
    if result == AM001 or result == AM003 or result == AM005:
        return make_json_response(result, 403)
  
    todo = Todo.objects.get(pk=todo_pk)

    if result.get('user_id') == todo.user_id:
        todo.delete()
        data = {
        'delete' : f'{todo_pk}번 리뷰가 삭제되었습니다.'
        }
        return make_json_response({'result': data, 'message': TM001})
    return make_json_response({'data': TM002}, 403)