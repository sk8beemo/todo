from rest_framework.permissions import BasePermission


class IsAuthorEntry(BasePermission):
    """ Post author or admin
    """

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or obj.group.founder == request.user
