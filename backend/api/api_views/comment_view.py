from rest_framework.views import APIView
from rest_framework.response import  Response
from rest_framework import status
from django.http import Http404
from ..serializers import (
                            CommentsSerializer,
                            )
from ..models import (
                        Comment,

                        )


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
            comment_list_serializer = CommentsSerializer(
                instance=comment_list, many=True)

            return Response(comment_list_serializer.data, status=status.HTTP_201_CREATED)

        return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostCommentDetailAPIView(APIView):

    def get_objects(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    # this is not necessary
    def get(self, request, pk, format=None):
        comment = self.get_objects(pk=pk)
        comment_serializer = CommentsSerializer(instance=comment)

        return Response(comment_serializer.data)

    # allow the user to update his/her comment
    def put(self, request, pk, format=None):
        pass

    # allow the user to delete his/her comment
    def delete(self, request, pk, format=None):
        pass
