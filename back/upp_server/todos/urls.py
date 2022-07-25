from django.urls import path
from . import views

app_name = 'todos'

urlpatterns = [
  # Todo
  path('', views.index, name="index"),
  path('create', views.create, name="create"),
  path('<int:todo_pk>', views.detail, name="detail"),
  path('update/<int:todo_pk>', views.update, name="update"),
  path('delete/<int:todo_pk>', views.delete, name="delete"),
]