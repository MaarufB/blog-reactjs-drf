from rest_framework.views import APIView
from rest_framework.response import  Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import Http404

# Import Serializers
# from ..serializers import (
#                             PostBaseSerializer, 
#                             PostSerializer,
#                             PostCommentSerializer
#                             )
# Import Models
from ..models import (
                        Post,
                        )


##TEST
from ..model_serializer.post_serializers import (
    BlogCreateUpdateSerializer, 
    BlogDisplaySerializer,
    PostCommentSerializer,
    PostBaseSerializer,
    PostSerializer
    )


class BlogListAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, format=None):
        blog = Post.objects.all()
        
        # serializer = PostSerializer(instance=blog, many=True)
        serializer = PostBaseSerializer(instance=blog, many=True)
        
        post_list = []

        for data in serializer.data:
            post_data = {
                "id":f"{data['id']}",
                "post_title": f"{data['post_title']}",
                "body": f"{data['body']}",
                "image": f"{data['image']}",
                "pub_date": f"{data['pub_date']}",
                "update_date": f"{data['update_date']}",
            }
            post_list.append(post_data)

        # print(post_list)

        # serializer =  BlogDisplaySerializer(instance=blog, many=True)
        
        return Response(serializer.data)
        # return Response(post_list)

    def post(self, request, format=None):

        # serializer = PostSerializer(data=request.data)

        # if serializer.is_valid():
        #     serializer.save()

        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        # TEST
        # from ..model_serializer import post_serializers

        post_serializer = BlogCreateUpdateSerializer(data=request.data)

        if post_serializer.is_valid():
            post_serializer.save()

            return Response(
                            post_serializer.data, 
                            status=status.HTTP_201_CREATED
                            )
        
        return Response(
                        post_serializer.errors, 
                        status=status.HTTP_400_BAD_REQUEST
                        )


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
