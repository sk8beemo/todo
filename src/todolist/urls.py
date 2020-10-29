from django.urls import path

from src.todolist.views import TodoListViewSet, TodoView

urlpatterns = [
    path('', TodoListViewSet.as_view()),
    path('todo', TodoView.as_view({'post': 'create'})),
    path('todo/<int:pk>', TodoView.as_view({
        'get': 'retrieve', 'put': 'update', 'delete': 'destroy'
    })),
]