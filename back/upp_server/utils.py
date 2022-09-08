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


def check_jwt_token(jwt_token):
		# 토큰 존재 여부 확인
		if not jwt_token:
				return AM001
		else:
				token_data = jwt.decode(jwt_token, env.JWT_PRIVATE_KEY, algorithms="HS256")
				user_email = token_data.get('email')

				# 토큰 포맷 일치 여부 확인
				for el in env.TOKEN_FORMAT:
						if not token_data.get(el):
								return AM003

				if token_data.get('type') == 'jwt':
						User = get_user_model()
						try:
								result = AM000
								result['user_id'] = User.objects.get(email=user_email).pk
								return result
						except:
								return AM005
				else:
						return AM003


def check_exist_empty_token(jwt_token):
    if jwt_token == 'null':
        return AM001
    else:
        result = check_jwt_token(jwt_token)
    return result
