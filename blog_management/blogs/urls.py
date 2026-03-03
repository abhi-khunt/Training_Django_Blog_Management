from django.urls import path
from . import views
urlpatterns = [
    path("create/",views.CreateBlogView.as_view()),
    path("", views.BlogListView.as_view()),
    path("my-blogs/",views.MyBlogListView.as_view()),
    path("edit-blog/<int:id>/",views.EditBlogView.as_view()),
    path("<int:id>/",views.ReadBlogView.as_view()),
    
]
