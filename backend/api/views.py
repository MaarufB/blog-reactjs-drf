from .serializers import (
    RegisterUserSerializer, 
    UserSerializer, 
    GroupSerializer)

from .models import (
                        Post, 
                        Comment, 
                        SubComment,
                        UserProfile,
                    )

from .serializers import (  
                            PostSerializer, 
                            CommentsSerializer,
                            PostBaseSerializer,
                            PostCommentSerializer,
                            UserProfileSerializer
                        )

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.http import Http404

# using Class-View
from rest_framework.views import APIView

# Apply Authentication
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from api import serializers
from asgiref.sync import sync_to_async

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view

#generic view
from rest_framework import generics
from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    # def get_objects(self, pk):
    #     try:
    #         return UserProfile.objects.get(user_id=pk)
    #     except UserProfile.DoesNotExist:
    #         raise Http404    
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        user_model = None  
        user_profile_serializer = None

        print(f"UserID {user.id}")

        if UserProfile.objects.filter(user=user.id).exists():
            user_model = UserProfile.objects.get(user=user.id)
            user_profile_serializer = UserProfileSerializer(instance=user_model)
            
            token['user_profile'] = user_profile_serializer.data
            print(f"Profile {token['user_profile']}")

        token['user_profile'] = None

        if token['user_profile'] is None:
            print(f"UserProfile is None {token['user_profile']}")

        return token

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
    ]
    return Response(routes)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterAPIView(APIView):
    # queryset = User.objects.all()
    # permission_classes = (AllowAny,)
    # serializer_class = RegisterUserSerializer
    # authentication_classes = []
    

    def post(self, request, *args, **kwargs):
        serializer = RegisterUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginAPIView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class ProfileAPIView(APIView):
    # permission_classes = (IsAuthenticated,)
    perser_classes = (MultiPartParser, FormParser)


    def get(self, request, pk, format=None):
        profile_model = UserProfile.objects.get(user=pk)
        profile_serializer = UserProfileSerializer(instance=profile_model, many=False)

        return Response(profile_serializer.data)

    def put(self, request, pk, format=None):
        profile_model = UserProfile.objects.get(user=pk)
        print(request.data)
        profile_serializer = UserProfileSerializer(instance=profile_model, data=request.data)

        if profile_serializer.is_valid():
            profile_serializer.save()

            return Response(profile_serializer.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        pass

class ProfilePostAPIView(APIView):
    # permission_classes = (IsAuthenticated,)
    perser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):
        
        return Response({"message": "None Necessary!"})

    def post(self, request, format=None):
        serializer = UserProfile(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogListAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, format=None):
        blog = Post.objects.all()
        print(f"{request.user}")
        # serializer = PostSerializer(instance=blog, many=True)
        serializer = PostBaseSerializer(instance=blog, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):

        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogDetailAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get_objects(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        context= {}

        blog = self.get_objects(pk=pk)
        # This is the original 1
        # serializer = PostSerializer(instance=blog)
        
        serializer = PostCommentSerializer(instance=blog)
        
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
        comment_serializer = CommentsSerializer(data=request.data)

        # test the incoming request data
        input_request = request.data
        
        if comment_serializer.is_valid():
            comment_serializer.save()
            comment_list = Comment.objects.all()
            comment_list_serializer = CommentsSerializer(instance=comment_list, many=True)
    
            return Response(comment_list_serializer.data, status=status.HTTP_201_CREATED)

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