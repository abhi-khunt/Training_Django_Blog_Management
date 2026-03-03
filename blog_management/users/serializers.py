from rest_framework import serializers
from .models import User
from utils.auth import create_access_token
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","email","first_name","last_name","profile_picture","password"]
        
        extra_kwargs = {
            "profile_picture":{ "required":False}
        }
    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User(**validated_data)

        # Hash password here
        user.set_password(password)

        user.save()

        return user
    
class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):

        username = attrs.get("username")
        password = attrs.get("password")

        user = User.objects.filter(username=username).first()

        if not user:
            raise serializers.ValidationError("User not found")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password")

        attrs["user"] = user

        return attrs
    
class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["profile_picture","first_name","last_name"]
        
        extra_kwargs = {
                "profile_picture":{ "required":False}
        }