from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework import status
from utils.auth import create_access_token,verify_access_token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import BasePermission
from rest_framework.views import APIView
from .serializers import RegisterSerializer , LoginSerializer, UpdateProfileSerializer
from .models import User

class IsValidToken(BasePermission):

    def has_permission(self, request, view):
        print("inside authenticator")
        access_token = request.COOKIES.get('access_token')
        
    
        user = verify_access_token(access_token)
        
        request.user_id = user.get("user_id")
        request.username = user.get("username")
        return True

# Create your views here.

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            data={'message':'User created successfully'}, 
            status=status.HTTP_201_CREATED
        )
    else:
        # send actual serializer errors
        return Response(
            data=serializer.errors,  # ← this gives detailed info
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(["POST"])
def login_user(request):

    serializer = LoginSerializer(data=request.data)

    print(request.data)
    print("after serializer")

    if serializer.is_valid():
        user = serializer.validated_data.get("user")
        token = create_access_token(user.id)
        response = Response(
            data={
                'message': 'You are logged in',
            },
            status=status.HTTP_200_OK
        )

        
        if user.role == "admin":
            response = Response({"role":"admin"},status=status.HTTP_200_OK)
        else:
            response = Response({"role":"user"},status=status.HTTP_200_OK)
        response.set_cookie(
            key="access_token",
            value=token,
            httponly=True,
            secure=False,   # True in production (HTTPS)
            samesite="Lax"
        )
        return response

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ProfileView(APIView):
    permission_classes=[IsValidToken]
    
    def get(self,request):
        
        user = User.objects.filter(id=request.user_id).get()
        print(user)
        serializer = UpdateProfileSerializer(user)
        print(serializer.data)
        if serializer.data:
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request):
        user = User.objects.filter(id=request.user_id).get()
        serializer = UpdateProfileSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'profile updated successfully'},status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)