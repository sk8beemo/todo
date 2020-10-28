from django.urls import path, include

urlpatterns = [
    path('todolist/', include('src.todolist.urls')),
]
