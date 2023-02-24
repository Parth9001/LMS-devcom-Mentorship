from django.shortcuts import render
from .serializers import RegisterSerializer
from .models import Student
from rest_framework.permissions import AllowAny

# Create your views here.
from rest_framework import generics


'''
View For SignUp Form
'''
class RegisterView(generics.CreateAPIView):
    queryset = Student.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer