import requests
import jwt

from urllib.parse import urlencode
from django.http import HttpResponseRedirect
from django.core.exceptions import ValidationError
from .models import User

def google_get_access_token(code: str):
	data = {
		'code': code,
		'client_id': '310763754913-02lvsola05qlakebccaqpi9km0kj8qlu.apps.googleusercontent.com',
		'client_secret': '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',
		'redirect_uri': 'http://localhost:8000/api/v1/auth/login/google/',
		'grant_type': 'authorization_code'
	}

	response = requests.post('https://oauth2.googleapis.com/token', data=data)

	if not response.ok:
		raise ValidationError('Failed to obtain access token from Google.')

	access_token = response.json()['access_token']

	return access_token

def google_get_user_info(access_token: str):
	response = requests.get(
		'https://www.googleapis.com/oauth2/v3/userinfo',
		params={'access_token': access_token}
	)

	if not response.ok:
		raise ValidationError('Failed to obtain user info from Google.')

	return response.json()

# Create your views here.
def google_login(request):
	code = request.GET.get('code')
	error = request.GET.get('error')

	if error or not code:
		params = urlencode({'error': error})
		return HttpResponseRedirect(f'http://localhost:3000?{params}')
	
	access_token = google_get_access_token(code)
	user_info = google_get_user_info(access_token)
	jwt_token = jwt.encode({'test': 'test'}, 'test_private_key', algorithm='HS256')
	print(jwt_token)
	print(jwt.decode(jwt_token, 'test_private_key', algorithms='HS256'))

	user = User.objects.create_user(email=user_info['email'], name=user_info['name'])
	print(user)

	params = urlencode({'jwt': jwt_token})

	return HttpResponseRedirect(f'http://localhost:3000?{params}')
	