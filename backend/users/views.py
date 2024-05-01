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
            email = serializer.validated_data.get('email')
            if User.objects.filter(email=email).exists():
                return Response({"error": "Email already exists"}, status=400)
            serializer.save()
            return Response(serializer.data) #because the extra_kwargs is there we do not have a password passed through this
        else:
            return Response({"error": "Email already exists"}, status=400)
        
class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated] #allow all users
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def list(self, request): #remember self is just "this"!
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class SavedInfoViewset(viewsets.ViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    queryset = SavedInfo.objects.all()
    serializer_class = SavedInfoSerializer
    
    def get_queryset(self):
        user = self.request.user  # Get the authenticated user
        return SavedInfo.objects.filter(author=user)  # Filter SavedInfo objects by the authenticated user

    def list(self, request):
        queryset = self.get_queryset()
        serializer = SavedInfoSerializer(queryset, many=True)
        return Response(serializer.data)


    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    def retrieve(self, request, pk=None):
        saved = self.queryset.get(pk=pk)
        serializer = self.serializer_class(saved)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        saved = self.queryset.get(pk=pk)
        saved.delete()
        return Response(status=204)
    
    
    