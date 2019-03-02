from django.db import models
from datetime import datetime


class Author(models.Model):
    name = models.CharField(max_length=64)
    email = models.CharField(max_length=64)

    def __str__(self):
        return "%s (%s)" % (self.name, self.email)


class Blog(models.Model):
    title = models.CharField(max_length=100, unique=True)
    body = models.TextField()
    date = models.DateTimeField()
    author = models.ForeignKey(Author)

    def __str__(self):
        return "%s (%s)" % (self.title, self.author.name)




class Comment(models.Model):
    name = models.CharField(max_length=42)
    email = models.EmailField(max_length=75)
    website = models.URLField(max_length=200, null=True, blank=True)
    text = models.TextField()
    post = models.ForeignKey(Blog)
    created_on = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return "%s (%s)" % (self.text)




