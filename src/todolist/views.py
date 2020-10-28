from rest_framework import viewsets

from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    """
    A viewset that to list all todo in the system.
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
