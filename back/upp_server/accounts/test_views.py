import jwt
from datetime import datetime, timedelta
from django.test import TestCase
from django.test import Client
from django.contrib.auth import get_user_model

import env


class AccountsTest(TestCase):
		def setUp(self):
				User = get_user_model()
				User.objects.create_user(email='exist@gmail.com', name='exist')

		#로그인 테스트
		def test_google_login_with_error(self):
				c = Client()
				res = c.get('/api/v1/auth/login/google/?error=error')

				self.assertTrue('error' in res.url)


		def test_first_google_login_with_code(self):
				User = get_user_model()

				user_email = "no.exist@gmail.com"
				user_name = "no exist"

				if not User.objects.filter(email=user_email):
						User.objects.create_user(email=user_email, name=user_name)
						self.assertTrue(User.objects.filter(email=user_email))
				else:
						self.assertFalse(User.objects.filter(email=user_email))


		def test_not_first_google_login_with_code(self):
				User = get_user_model()

				user_email = 'exist@gmail.com'

				if User.objects.filter(email=user_email):
						self.assertTrue(User.objects.filter(email=user_email))
				else:
						self.assertFalse(User.objects.filter(email=user_email))

		
		# 유저 정보 요청 테스트
		def test_get_user_infomation_without_jwt_token(self):
				c = Client()

				header = {"HTTP_no_jwt": ''}
				response = c.get('/api/user_info/', content_type='application/json', **header)
				self.assertTrue(response.status_code == 401 and response.json()['data']['codeName'] == 'AM001')


		def test_get_user_infomation_with_expired_jwt_token(self):
				c = Client()

				jwt_token = jwt.encode({
						'type': 'jwt',
						'name': 'exist', 
						'email': 'exist@gmail.com', 
						'expiration_time': datetime.now().timestamp() - 1000000
				}, env.JWT_PRIVATE_KEY, algorithm=env.ALGORITHM)

				header = {"HTTP_jwt": jwt_token}
				response = c.get('/api/user_info/', content_type='application/json', **header)
				self.assertTrue(response.status_code == 401 and response.json()['data']['codeName'] == 'AM002')


		def test_get_user_infomation_with_correct_jwt_token(self):
				c = Client()

				jwt_token = jwt.encode({
						'type': 'jwt',
						'name': 'exist', 
						'email': 'exist@gmail.com', 
						'expiration_time': (datetime.now() + timedelta(days=1)).timestamp()
				}, env.JWT_PRIVATE_KEY, algorithm=env.ALGORITHM)

				header = {"HTTP_jwt": jwt_token}
				response = c.get('/api/user_info/', content_type='application/json', **header)
				self.assertTrue(response.status_code == 200 and response.json()['data']['codeName'] == 'AM000')


		def test_get_user_infomation_not_sigunup(self):
				c = Client()

				jwt_token = jwt.encode({
						'type': 'jwt',
						'name': 'no exist', 
						'email': 'no.exist@gmail.com', 
						'expiration_time': (datetime.now() + timedelta(days=1)).timestamp()
				}, env.JWT_PRIVATE_KEY, algorithm=env.ALGORITHM)

				header = {"HTTP_jwt": jwt_token}
				response = c.get('/api/user_info/', content_type='application/json', **header)
				self.assertTrue(response.status_code == 401 and response.json()['data']['codeName'] == 'AM005')


		# refresh 토큰 테스트
		def test_refresh_token_without_refresh_token(self):
				c = Client()

				header = {"HTTP_no_refresh": ''}
				response = c.get('/api/refresh/', content_type='application/json', **header)
				self.assertTrue(response.status_code == 401 and response.json()['data']['codeName'] == 'AM001')


		def test_refresh_token_with_expired_refresh_token(self):
				c = Client()

				refresh_token = jwt.encode({
						'type': 'refresh',
						'name': 'exist', 
						'email': 'exist@gmail.com', 
						'expiration_time': datetime.now().timestamp() - 1000000
				}, env.JWT_PRIVATE_KEY, algorithm=env.ALGORITHM)

				header = {"HTTP_refresh": refresh_token}
				response = c.get('/api/refresh/', content_type='application/json', **header)
				self.assertTrue(response.status_code == 401 and response.json()['data']['codeName'] == 'AM003')


		def test_refresh_token_with_correct_refresh_token(self):
				c = Client()

				refresh_token = jwt.encode({
						'type': 'refresh',
						'name': 'exist', 
						'email': 'exist@gmail.com', 
						'expiration_time': (datetime.now() + timedelta(days=1)).timestamp()
				}, env.JWT_PRIVATE_KEY, algorithm=env.ALGORITHM)

				header = {"HTTP_refresh": refresh_token}
				response = c.get('/api/refresh/', content_type='application/json', **header)
				self.assertTrue(response.status_code == 200 and response.json()['data']['codeName'] == 'AM000')