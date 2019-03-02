from django.shortcuts import render
from django.http import JsonResponse
import simplejson as json

from coredb.models import Post


  

# Create your views here.
def HomePageView(request):
    throw = {
        'page_name':'Home page',
        'created':'now'
    }
    data = JsonResponse(throw)
    return data

#blog lists 
def Bloglists(request):
    posts = Post.objects.all()
    posts = [post.convert_json() for post in posts]

    throw = {
            'page_name':'Bloglist',
            'created':'now'
    }
    data = JsonResponse(posts, safe=False)
   
    return data
   

#single blog according to blog_id
def SingleBlog(request,blog_id):
    posts = Post.objects.all()
    posts = [post.convert_json() for post in posts]
    x=int(blog_id)
    post = posts[x]
    #p = post['desc']
    throw = {
            'page_name':'Single Blog',
            'created':'now',
            'blog_id':'123'
    }
    throw['blog_id'] = blog_id
    data = JsonResponse(post,safe=False)
    return data
