from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate #although we overrided authenticate, itll use our implementation
from knox.models import AuthToken

User = get_user_model() #always get latest user
# Create your views here.

class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            user = authenticate(request , email=email, password=password)
            
            if user: #if user is there or not
                _, token = AuthToken.objects.create(user) #auth token is name of database
                return Response(
                    {
                    "user" : self.serializer_class(user).data,
                    "token": token                
                    }
                ) 
            else:
                return Response({"error" : "Invalid credentials"}, status = 400)
        else:
            return Response(serializer.errors, status=400)
 


class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny] #allow all users
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request): #remember self is just "this"!
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data) #because the extra_kwargs is there we do not have a password passed through this
        else:
            return Response(serializer.errors, status=400)
        
class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated] #allow all users
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def list(self, request): #remember self is just "this"!
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
