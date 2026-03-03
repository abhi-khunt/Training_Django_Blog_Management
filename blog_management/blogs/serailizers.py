from rest_framework import serializers
from .models import Blog
class CreateBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields =["user","author","blog_title","blog_thumbnail","blog_content"]
        
        extra_kwargs = {
            "blog_thumbnail":{ "required":False}
        }

class BlogsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = [
            "id",
            "blog_title",
            "blog_thumbnail",
            "author"
        ]

class SingleBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            "blog_title",
            "blog_thumbnail",
            "blog_content",
        ]