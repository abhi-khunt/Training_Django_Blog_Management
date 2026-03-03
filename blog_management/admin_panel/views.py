from django.shortcuts import render
from rest_framework.permissions import BasePermission
from rest_framework.generics import ListAPIView 
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from utils.auth import verify_access_token
from users.models import User
from .serializers import UserSerializer
# Create your views here.
class IsValidToken(BasePermission):

    def has_permission(self, request, view):
        print("inside authenticator")
        access_token = request.COOKIES.get('access_token')
        
    
        user_detail = verify_access_token(access_token)
        user = User.objects.filter(id=user_detail.get("user_id")).get()
        if user.role != "admin":
            return False    
        request.user_id = user_detail.get("user_id")
        request.username = user_detail.get("username")
        return True

class ProfileListView(ListAPIView):
    permission_classes=[IsValidToken]
    queryset = User.objects.all().exclude(role='admin')
    serializer_class= UserSerializer

class UserView(APIView):
    permission_classes = [IsValidToken]
    
    def put(self,request,id):
        user = User.objects.get(id=id)
        user.role = request.data.get("role")
        user.save()
        return Response({"message":"role updated successfully"},status=status.HTTP_200_OK)
    
    
    def delete(self,request,id):
        user = User.objects.get(id=id)
        user.delete()
        return Response({'message':"user deleted successfully"},status=status.HTTP_200_OK)
    