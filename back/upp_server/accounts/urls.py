from django.urls import path
from .views import google_login

urlpatterns = [
    path('v1/auth/login/google/', google_login)
]
