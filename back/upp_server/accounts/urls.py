from django.urls import path
from .views import google_login, get_user_info


urlpatterns = [
    path('v1/auth/login/google/', google_login),
    path('user_info/', get_user_info),
    # path('refresh/', refresh_login_status),
]
