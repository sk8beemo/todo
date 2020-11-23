from django.db import models

from src.user.models import User


class Todo(models.Model):
    """ToDo model in database"""
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', blank=True, null=True, on_delete=models.CASCADE, related_name='children')
    title = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    in_archive = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return f"ToDo:{self.id} {self.title}"
