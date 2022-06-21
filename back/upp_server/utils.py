import jwt
from django.http import JsonResponse
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model

import env
from messages import AM000, AM001, AM002, AM003, AM005


def make_json_response(data, code=200):
		return JsonResponse(status=code, data=data, safe=False, json_dumps_params={'ensure_ascii': False})


def generate_expiration_date(time):
		return int((datetime.now() + timedelta(days=time)).timestamp())


def check_token_in_header(token):
		# 토큰 존재 여부 확인
		if not token:
				return AM001
		else:
				token_data = jwt.decode(token, env.JWT_PRIVATE_KEY, algorithms="HS256")

				user_name = token_data.get('name')
				user_email = token_data.get('email')
				is_expiration = token_data.get('expiration_time') < datetime.now().timestamp()

				# 토큰 포맷 일치 여부 확인
				for el in env.TOKEN_FORMAT:
						if not token_data.get(el):
								return AM003

				if token_data.get('type') == 'jwt':
						if is_expiration:
								return AM002
						else:
								User = get_user_model()
								try:
										user = User.objects.get(name=user_name)
										return user.pk
								except:
										return AM005

				elif token_data.get('type') == 'refresh':
						if is_expiration:
								return AM003
						else:
								jwt_token = jwt.encode({
										'type': 'jwt',
										'name': user_name, 
										'email': user_email, 
										'expiration_time': generate_expiration_date(1)
								}, env.JWT_PRIVATE_KEY, algorithm=env.ALGORITHM)
								response = AM000
								response['jwt'] = jwt_token
								return response
				else:
						return AM003

