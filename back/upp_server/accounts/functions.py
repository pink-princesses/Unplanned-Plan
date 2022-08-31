# pakages
import requests
from django.forms import ValidationError

# modules
import env

def google_get_access_token(code: str):
		data = {
				'code': code,
				'client_id': env.GOOGLE_CONSOLE_CLIENT_ID,
				'client_secret': env.GOOGLE_CONSOLE_CLIENT_SECRET,
				'redirect_uri': env.GOOGLE_CONSOLE_REDIRECT_URI,
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

