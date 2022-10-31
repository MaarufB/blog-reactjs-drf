from rest_framework import serializers
from ..models import UserProfile, Post, Comment, SubComment
from .user_profile_serializer import UserSerializer
from .comment_serializer import CommentsSerializer
from .user_profile_serializer import UserProfileSerializer

## We will create a serializer class here


class PostBaseSerializer(serializers.ModelSerializer):
    # Make a function here that will clean the date_time data
    # user_profile = UserProfileSerializer(many=False, read_only=True)
    user = UserSerializer(many=False, read_only=True)
    
    # We will make chages to the data we are returning using source
    # profile_pic = serializers.CharField(source='user.profile_pic', read_only=True)
    
    class Meta:
        # profile_pic = serializers.ReadOnlyField(source="userprofile.profile_pic")
        model = Post
        fields = [  'id', 
                    'user', 
                    'profile_pic',
                    'user_id',
                    'post_title', 
                    'body', 
                    'image'
                ]

        fields = "__all__"

class PostCommentSerializer(PostBaseSerializer):
    comments = CommentsSerializer(many=True, read_only=True)    

    class Meta(PostBaseSerializer.Meta):
        # fields = PostBaseSerializer.Meta.fields + [
        #     'comments'   
        # ]
        fields = "__all__"

# POST And update serializer
class BlogCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class BlogDisplaySerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    

    # We will make chages to the data we are returning using source
    # profile_pic = serializers.CharField(source='user.profile_pic', read_only=True)
    
    class Meta:
        # profile_pic = serializers.ReadOnlyField(source="userprofile.profile_pic")
        model = Post
        fields = [  'id', 
                    'user', 
                    'post_title', 
                    'body', 
                    'image'
                ]



####

class PostSerializer(serializers.ModelSerializer):
    comments = CommentsSerializer(many=True, read_only=True)
    user = UserProfileSerializer(many=False, read_only=True)

    class Meta:
        # user = serializers.ReadOnlyField(source='*')
        model = Post
        fields = (
                    'id', 
                    'user', 
                    'post_title', 
                    'body', 
                    'image', 
                    'comments'
                )
        
        # fields = '__all__'

