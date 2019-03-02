from django.db import models
from django.db.models import permalink

class Author(models.Model):
    fname = models.CharField(max_length=255)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)

    def __unicode__(self):
        return '%s' % self.fname


    class Meta:
        db_table = "author"
    @permalink
    def get_absolute_url(self):
        return ('view_blog_post', None, { 'slug': self.slug })

class Comments(models.Model):
    txt = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return '%s' % self.txt


    class Meta:
        db_table = "comments"

    @permalink
    def get_absolute_url(self):
        return ('view_blog_post', None, { 'slug': self.slug })

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return '%s' % self.name
    class Meta:
        db_table = "catagory"

    @permalink
    def get_absolute_url(self):
        return ('view_blog_post', None, { 'slug': self.slug })


class Post(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    comments = models.CharField(max_length=255)
    author =  models.ForeignKey(Author)
    category_id = models.ForeignKey(Category)

    def __unicode__(self):
        return '%s' % self.title
    class Meta:
        db_table = "post"

    @permalink
    def get_absolute_url(self):
        return ('view_blog_post', None, { 'slug': self.slug })

    def convert_json(self):
        return {
                'id': self.id,
                'title': self.title,
                'desc': self.description,
                'comments': self.description,
                'author': self.author.fname
        }

