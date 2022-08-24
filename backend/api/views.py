# from django.http import JsonResponse
# from django.shortcuts import render
# from django.contrib.auth.models import User, Group
# from rest_framework import viewsets
from .serializers import RegisterUserSerializer, UserSerializer, GroupSerializer

from .models import Post, Comment, SubComment
from .serializers import PostSerializer, CommentsSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView

from django.http import Http404

# using Class-View
from rest_framework.views import APIView

# Apply Authentication
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from api import serializers
from asgiref.sync import sync_to_async

from rest_framework.parsers import MultiPartParser, FormParser



# import Helpers module
# from Helpers import get_object


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims
#         token['username'] = user.username
#         # ...
#         return token

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

# class RegisterAPIView(APIView):
#     authentication_classes = []
    
#     def post(self, request, *args, **kwargs):
#         serializer = RegisterUserSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# class LoginAPIView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

class BlogListAPIView(APIView):
    # permission_classes = (IsAuthenticated,)
    # @sync_to_async
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, format=None):
        blog = Post.objects.all()
        serializer = PostSerializer(instance=blog, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):

        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogDetailAPIView(APIView):
    
    def get_objects(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        context= {}

        blog = self.get_objects(pk=pk)
        serializer = PostSerializer(instance=blog)
        
        comment = Comment.objects.filter(post=blog)
        comment_serializer = CommentsSerializer(instance=comment)

        context['id'] = serializer.data['id']
        context['post_title'] = serializer.data['post_title']
        context['body'] = serializer.data['body']
        context['comments'] = list()

        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        blog = self.get_objects(pk=pk)
        serializer = PostSerializer(instance=blog, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None):
        blog:Post = self.get_objects(pk=pk)
        blog.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)



# from django.views.decorators.csrf import csrf_exempt

class PostCommentGetPostAPI(APIView):
    
    def get(self, request, format=None):
        comment = Comment.objects.all()
        comment_serializer = CommentsSerializer(instance=comment, many=True)

        return Response(comment_serializer.data)
    
    def post(self, request, format=None):
        context = {}

        comment_serializer = CommentsSerializer(data=request.data)

        # test the incoming request data
        input_request = request.data
        
        if comment_serializer.is_valid():
            comment_serializer.save()
            comment_list = Comment.objects.all()
            comment_list_serializer = CommentsSerializer(instance=comment_list, many=True)
    
            return Response(comment_serializer.data, status=status.HTTP_201_CREATED)

        return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostCommentDetailAPIView(APIView):
    
    def get_objects(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        comment = self.get_objects(pk=pk)
        comment_serializer = CommentsSerializer(instance=comment)

        return Response(comment_serializer.data)

    def put(self, request, pk, format=None):
        pass

    def delete(self, request, pk, format=None):
        pass
