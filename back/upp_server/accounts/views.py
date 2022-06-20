import jwt

from urllib.parse import urlencode
from django.http import HttpResponseRedirect
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from .functions import google_get_access_token, google_get_user_info

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
				'expiration_time': int((datetime.now() + timedelta(days=1)).timestamp())
		}, 'test_private_key', algorithm='HS256')

		refresh_token = jwt.encode({
				'type': 'refresh',
				'name': user_name, 
				'email': user_email, 
				'expiration_time': int((datetime.now() + timedelta(days=30)).timestamp())
		}, 'test_private_key', algorithm='HS256')

		params = urlencode({'jwt': jwt_token, 'refresh': refresh_token})

		return HttpResponseRedirect(f'http://localhost:3000/login?{params}')