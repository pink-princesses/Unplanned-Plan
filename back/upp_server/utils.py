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
										result = AM000
										result['user_id'] = User.objects.get(email=user_email).pk
										return result
								except:
										return AM005
				else:
						return AM003


def refresh_jwt_token(token):
		token_data = jwt.decode(token, env.JWT_PRIVATE_KEY, algorithms="HS256")
		user_name = token_data.get('name')
		user_email = token_data.get('email')
		is_expiration = token_data.get('expiration_time') < datetime.now().timestamp()

		if token_data.get('type') == 'refresh':
				if is_expiration:
						return AM003
				else:
						jwt_token = jwt.encode({
								'type': 'jwt',
								'name': user_name, 
								'email': user_email, 
								'expiration_time': generate_expiration_date(1)
						}, env.JWT_PRIVATE_KEY, algorithm=env.ALGORITHM)
						try:
								User = get_user_model()
								user = User.objects.get(email=user_email)
								response = AM000
								response['jwt'] = jwt_token
								response['user_id'] = user.pk
								return response
						except:
								return AM005
		else:
				return AM001


def check_exist_empty_token(jwt_token, refresh_token):
    # 헤더에 토큰이 모두 없을 경우 조회 불가
    if jwt_token == 'null' and refresh_token == 'null':
        return AM001
    # 헤더에 refresh 토큰만 있을 경우 조회 시도 가능
    elif jwt_token == 'null':
        result = refresh_jwt_token(refresh_token)
    # 헤더에 jwt & refresh 토큰이 있을 경우 조회 시도 가능
    else:
        result = check_jwt_token(jwt_token)

        #jwt 토큰가 만료되면 재발급 시도
        if result == AM002:
            result = refresh_jwt_token(refresh_token)

    return result
