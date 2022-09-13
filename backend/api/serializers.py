from dataclasses import fields
from django.contrib.auth.models import User, Group
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import Post, Comment, SubComment, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('profile_pic',)

class CommentsSerializer(serializers.ModelSerializer):
    # post_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Comment
        # fields = ['id', 'comment_text', 'comment_date', 'user_id', 'post_id']
        fields = '__all__'
        
        # def get_related_field(self, model_field):
        #     return CommentsSerializer()


class PostBaseSerializer(serializers.ModelSerializer):
    # Make a function here that will clean the date_time data
    user = UserProfileSerializer(many=False, read_only=True)

    class Meta:
        model = Post
        fields = [  'id', 
                    'user', 
                    'post_title', 
                    'body', 
                    'image'
                ]

class PostCommentSerializer(PostBaseSerializer):
    comments = CommentsSerializer(many=True, read_only=True)    
    class Meta(PostBaseSerializer.Meta):
        fields = PostBaseSerializer.Meta.fields + [
            'comments'   
        ]


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
                )#'comments' add this comment
        
        # fields = '__all__'

class SubcomentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubComment
        fields = (
                    'id', 
                    'comment_id', 
                    'comment_text', 
                    'comment_image',
                    'comment_date'
                )
