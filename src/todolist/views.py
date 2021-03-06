from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response

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
        queryset = Todo.objects.all()
        is_completed = self.request.query_params.get('is_completed', None)
        in_archive = self.request.query_params.get('in_archive', None)
        if is_completed is not None:
            queryset = queryset.filter(is_completed=is_completed).filter(in_archive=False)
        elif in_archive is not None:
            queryset = queryset.filter(in_archive=in_archive)
        else:
            queryset = queryset.filter(in_archive=False)
        return queryset


class TodoView(CreateRetrieveUpdateDestroy):
    """ Todo's CRUD
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthorEntry, ]
    permission_classes_by_action = {'get': [IsAuthorEntry],
                                    'update': [IsAuthorEntry],
                                    'destroy': [IsAuthorEntry]}

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            if 'parent' in request.data:
                parent = Todo.objects.get(pk=request.data['parent'])
                serializer.save(
                    owner=self.request.user,
                    parent=parent
                )
            else:
                serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
