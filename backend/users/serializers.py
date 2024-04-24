from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model() #always get latest user

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password')
        extra_kwargs = { 'password': {'write_only':True}} #stops api from showing password

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) #validated data is encrypted
        return user 
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None) #make sure there is nothing in the password field
        return ret
    
    
class SavedInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedInfo
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}} #can only read and not edit author (opposite of write only where you can't view at all)
