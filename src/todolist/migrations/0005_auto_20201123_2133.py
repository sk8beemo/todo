# Generated by Django 3.1.2 on 2020-11-23 18:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0004_todo_parent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='content',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='due_date',
        ),
    ]
