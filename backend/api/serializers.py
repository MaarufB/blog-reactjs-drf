from dataclasses import fields
from django.contrib.auth.models import User, Group
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import Post, Comment, SubComment, UserProfile

class UserSerializer(serializers.ModelSerializer):
    # profile_pic = serializers.CharField(source='userprofile.profile_pic')

    class Meta:
        model = User
        fields = ['url', 'username', 'first_name','email', 'groups']

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
        fields = (
            'first_name',
            'last_name',
            'username', 
            'password', 
            'password2'
            )

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']            
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class UserProfileSerializer(serializers.ModelSerializer):
    # user = UserSerializer(many=False, read_only=False)
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    
    class Meta:
        # user_parent = serializers.ReadOnlyField(source='user')
        model = UserProfile
        # Be careful when using tuple instead of list, make user to
        # add ',' after if you only put a single item or else
        # you'll get an error

        fields = (
                  'id',
                  'username',
                  'email',
                  'first_name',
                  'last_name',
                  'profile_pic', 
                  'user_id', 
                  'address'
                  )
        # fields = '__all__'

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
    # user = UserSerializer(many=False, read_only=True)
    
    # We will make chages to the data we are returning using source
    # profile_pic = serializers.CharField(source='user.profile_pic', read_only=True)
    
    class Meta:
        # profile_pic = serializers.ReadOnlyField(source="userprofile.profile_pic")
        model = Post
        # fields = [  'id', 
        #             'user', 
        #             'profile_pic',
        #             'user_id',
        #             'post_title', 
        #             'body', 
        #             'image'
        #         ]

        fields = "__all__"

class PostCommentSerializer(PostBaseSerializer):
    comments = CommentsSerializer(many=True, read_only=True)    
    class Meta(PostBaseSerializer.Meta):
        # fields = PostBaseSerializer.Meta.fields + [
        #     'comments'   
        # ]
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    comments = CommentsSerializer(many=True, read_only=True)
    user = UserProfileSerializer(many=False, read_only=True)

    class Meta:
        # user = serializers.ReadOnlyField(source='*')
        model = Post
        fields = (
                    'id', 
                    'user', 
                    # 'user_id',
                    'post_title', 
                    'body', 
                    'image', 
                    # 'comments'
                )
        
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