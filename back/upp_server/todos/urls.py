from django.urls import path
from . import views

app_name = 'todos'

urlpatterns = [
  # Todo
  path('', views.index, name="index"),
  path('range/<int:first_date>/<int:last_date>', views.get_todos),
  path('create', views.create, name="create"),
  path('detail/<int:todo_pk>', views.detail, name="detail"),
  path('update/<int:todo_pk>', views.update, name="update"),
  path('delete/<int:todo_pk>', views.delete, name="delete"),
  path('customer', views.customer, name="customer"),
]