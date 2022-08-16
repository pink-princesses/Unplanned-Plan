# pakages
import jwt
from urllib.parse import urlencode
from django.http import HttpResponseRedirect
from django.contrib.auth import get_user_model
from django.views.decorators.http import require_http_methods


# modules
import env
from .functions import *
from messages import AM000, AM005
from utils import generate_expiration_date, make_json_response,     check_jwt_token

# Create your views here.
def google_login(request):
		User = get_user_model()

		code = request.GET.get('code')
		error = request.GET.get('error')

		if error or not code:
				params = urlencode({'error': error})
				return HttpResponseRedirect(f'http://localhost:3000?{params}')

		access_token = google_get_access_token(code)
		
		user_info = google_get_user_info(access_token)
		user_name = user_info['name']
		user_email = user_info['email']

		if not User.objects.filter(email=user_email):
				User.objects.create_user(email=user_email, name=user_name)

		jwt_token = jwt.encode({
				'type': 'jwt',
				'name': user_name, 
				'email': user_email, 
				'expiration_time': generate_expiration_date(1)
		}, env.JWT_PRIVATE_KEY, algorithm=env.ALGORITHM)

		refresh_token = jwt.encode({
				'type': 'refresh',
				'name': user_name, 
				'email': user_email, 
				'expiration_time': generate_expiration_date(30)
		}, env.JWT_PRIVATE_KEY, algorithm=env.ALGORITHM)

		params = urlencode({'jwt': jwt_token, 'refresh': refresh_token})

		return HttpResponseRedirect(f'http://localhost:3000/login?{params}')


@require_http_methods(["POST"])
def refresh_login_status(request):
		token = request.headers.get('refresh')
		result =     check_jwt_token(token)

		if result.get('status'):
				return make_json_response({'data': result})
		else:
				return make_json_response({'data': result}, code=401)


@require_http_methods(["GET", "POST"])
def get_user_info(request):
		token = request.headers.get('jwt')
		result =     check_jwt_token(token)

		if type(result) == int or result.get('status'):
				User = get_user_model()
				try:
						user = User.objects.get(pk=result)
						user_data = {
							'userName': user.name,
							'nickName': user.nickname,
						}
						response = AM000
						response['userData'] = user_data

						return make_json_response({'data': response})
				except:
						return make_json_response({'data': AM005}, 401)
		else:
				return make_json_response({'data': result}, 401)


