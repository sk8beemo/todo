from rest_framework import serializers

from src.todolist.models import Todo


class TodoListSerializer(serializers.ModelSerializer):
    """
    Serializer for Todo model
    """
    owner = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Todo
        fields = ['owner', 'title', 'content', 'created', 'due_date', 'is_completed', 'in_archive',]


class TodoSerializer(serializers.ModelSerializer):
    """ Post editing and output
    """
    owner = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Todo
        fields = ['owner', 'title', 'content', 'created', 'due_date', 'is_completed', 'in_archive']