from rest_framework import generics

from .models import Todo
from .serializers import TodoSerializer, TodoListSerializer
from ..base.classes import CreateRetrieveUpdateDestroy
from ..base.permissions import IsAuthorEntry


class TodoListViewSet(generics.ListAPIView):
    """
    A viewset that to list all todo in the system.
    """
    serializer_class = TodoListSerializer
    permission_classes = [IsAuthorEntry, ]

    def get_queryset(self):
        return Todo.objects.filter(
            owner=self.request.user).filter(in_archive=False)


class TodoView(CreateRetrieveUpdateDestroy):
    """ Todo's CRUD
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthorEntry, ]
    permission_classes_by_action = {'get': [IsAuthorEntry],
                                    'update': [IsAuthorEntry],
                                    'destroy': [IsAuthorEntry]}

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)