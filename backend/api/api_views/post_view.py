from rest_framework.views import APIView
from rest_framework.response import  Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import Http404

# Import Serializers
from ..serializers import (
                            PostBaseSerializer, 
                            PostSerializer,
                            PostCommentSerializer
                            )
# Import Models
from ..models import (
                        Post,
                        )


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
