from rest_framework import serializers

from src.todolist.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    """
    Serializer for Todo model
    """
    owner = serializers.SlugRelatedField(slug_field="username", read_only=True)

    class Meta:
        model = Todo
        fields = ['owner', 'title', 'content', 'created', 'due_date', 'is_completed']