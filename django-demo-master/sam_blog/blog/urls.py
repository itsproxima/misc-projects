#blogs/urls.py
from django.conf.urls import url
from blog import views

urlpatterns =[
    url(r'^$', views.HomePageView,name='Home page'),
    url(r'^bloglist',views.Bloglists,name='Blog List'),
    url(r'^blogSingle/(?P<blog_id>\d+)/',views.SingleBlog,name='particular Blog'),
    
]
