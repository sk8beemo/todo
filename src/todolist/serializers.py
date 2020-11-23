from rest_framework import serializers

from src.todolist.models import Todo


class FilterTodoListSerializer(serializers.ListSerializer):
    """ Filter of ToDos, only parents
    """

    def to_representation(self, data):
        data = data.filter(parent=None)
        return super().to_representation(data)


class RecursiveSerializer(serializers.Serializer):
    """Recursive display children elements
    """

    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class TodoListSerializer(serializers.ModelSerializer):
    """
    Serializer for Todos model
    """
    owner = serializers.ReadOnlyField(source='user.username')
    children = RecursiveSerializer(many=True)
    parent = serializers.CharField(read_only=True, source='todo.parent')

    class Meta:
        list_serializer_class = FilterTodoListSerializer
        model = Todo
        fields = ['id', 'parent', 'children', 'owner', 'title', 'is_completed', 'in_archive', ]


class TodoSerializer(serializers.ModelSerializer):
    """ Post editing and output
    """
    owner = serializers.ReadOnlyField(source='user.username')
    parent = serializers.SlugRelatedField(
        slug_field='id',
        read_only=True
    )

    class Meta:
        model = Todo
        fields = ('id', 'parent', 'owner', 'title', 'is_completed', 'in_archive',)