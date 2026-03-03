from functools import wraps

from django.shortcuts import get_object_or_404, render
from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import ListAPIView
from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView
from utils.auth import verify_access_token

from .models import Blog
from .pagination import BlogPagination
from .serailizers import (BlogsSerializer, CreateBlogSerializer,
                          SingleBlogSerializer)

# Create your views here.

def is_valid_token(view_func):

    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        
        access_token = request.COOKIES.get('access_token')
        
        try:
            user = verify_access_token(access_token)

            request.user_id = user.get("user_id")
            request.username = user.get("username")

        except AuthenticationFailed as e:
            
            return Response(
                {"error": str(e)},
                status=401
                )
       
        return view_func(request, *args, **kwargs)

    return wrapper

class IsValidToken(BasePermission):

    def has_permission(self, request, view):
        print("inside authenticator")
        access_token = request.COOKIES.get('access_token')
        
    
        user = verify_access_token(access_token)
        
        request.user_id = user.get("user_id")
        request.username = user.get("username")
        return True
        

        

class CreateBlogView(APIView):

    permission_classes = [IsValidToken]


    def post(self, request):
        thumbnail = request.FILES.get("thumbnail")
        blog={
        "user":request.user_id,
        "author":request.username,
        "blog_title":request.data.get("title"),
        "blog_content":request.data.get("content"),
        }
        if thumbnail:
            blog["blog_thumbnail"]=thumbnail
        serializer = CreateBlogSerializer(data = blog)
        print("Executed")
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'blog posted successfully'},status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# @is_valid_token
# @api_view(["POST"])
# def create_blog(request):
#     blog={
#         "user":request.user_id,
#         "author":request.username,
#         "blog_title":request.data.get("title"),
#         "blog_content":request.data.get("content"),
#         "blog_thumbnail":request.FILES.get("thumbnail"),
#     }
#     serializer = CreateBlogSerializer(data = blog)
#     print("Executed")
#     if serializer.is_valid():
#         serializer.save()
#         return Response({'message':'blog posted successfully'},status=status.HTTP_201_CREATED)
#     else:
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class BlogListView(ListAPIView):

    queryset = Blog.objects.all().order_by("-id")
    serializer_class = BlogsSerializer
    pagination_class = BlogPagination

class MyBlogListView(ListAPIView):

    
    serializer_class = BlogsSerializer
    pagination_class = BlogPagination
    
    @method_decorator(is_valid_token)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


    def get_queryset(self):
        return Blog.objects.filter(
            user_id=self.request.user_id
        ).order_by("-created_at")
        

class EditBlogView(APIView):
    
    permission_classes =[IsValidToken]
    
    
    
    def put(self,request,id):
        print("inside put")
        blog = Blog.objects.get(id=id)
        newdata ={
            "blog_title":request.data.get("blog_title"),
            "blog_content":request.data.get("blog_content")
        }
        if request.FILES.get("blog_thumbnail"):
            blog["blog_thumbnail"]=request.FILES.get("blog_thumbnail")
        serializer = SingleBlogSerializer(blog,data=newdata)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'updated successfully'},status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'update unsuccessfull'},status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id):
        blog = get_object_or_404(Blog, id=id)
        
        if blog:
            blog.delete()
            return Response({'message':'blog deleted successfullty'},status=status.HTTP_200_OK)
        else:
            return Response({'message':'blog not found'},status=status.HTTP_404_NOT_FOUND)
        
class ReadBlogView(APIView):
   def get(self,request,id):
        print("inside get")
        blog = Blog.objects.get(id=id)
        serializer = SingleBlogSerializer(blog)
        if serializer.data :
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({"message":"view error occured"},) 