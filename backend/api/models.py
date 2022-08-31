from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class NoteManager(models.Manager):
    def create_note(self, user, body):
        note = self.create(user=user, body=body)
        # do something with the book
        return note


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()
    created = models.DateTimeField(default=timezone.now)

    objects = NoteManager()

    def __str__(self):
        return self.body
