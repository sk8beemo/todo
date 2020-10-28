from django.db import models

from src.user.models import User


class Todo(models.Model):
    """ToDo model in database"""
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    content = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return f"ToDo: {self.title}"
