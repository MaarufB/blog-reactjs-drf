from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (
    Post, 
    Comment
    )

class TestApiView(APIView):

    def get(self, request, format=None, *args, **kwarsg):

        dummy_data = {"message": "Hello World!"}

        return Response(data=dummy_data)

class PostListApi(APIView):
    def get(self, request, format=None):
        post = Post.objects.all()
        