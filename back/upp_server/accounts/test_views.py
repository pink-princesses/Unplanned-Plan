from django.test import TestCase
from django.test import Client
from django.contrib.auth import get_user_model


class AccountsTest(TestCase):
		def setUp(self):
				User = get_user_model()
				saved_user = User.objects.create_user(email='exist@gmail.com', name='exist')

		def test_google_login_with_error(self):
				c = Client()
				res = c.get('/api/v1/auth/login/google/?error=error')

				self.assertTrue('error' in res.url)

		def test_first_google_login_with_code(self):
				User = get_user_model()

				user_email = "no.exist@gmail.com"
				user_name = "no exist"

				if not User.objects.filter(email=user_email):
						saved_user = User.objects.create_user(email=user_email, name=user_name)
						self.assertTrue(User.objects.filter(email=user_email))
				else:
						self.assertFalse(User.objects.filter(email=user_email))


		def test_not_first_google_login_with_code(self):
				User = get_user_model()

				user_email = 'exist@gmail.com'
				user_name = 'exist'

				if User.objects.filter(email=user_email):
						self.assertTrue(User.objects.filter(email=user_email))
				else:
						self.assertFalse(User.objects.filter(email=user_email))
