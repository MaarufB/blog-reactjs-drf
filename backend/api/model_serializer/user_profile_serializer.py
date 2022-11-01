from django.contrib.auth.models import User, Group
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from ..models import UserProfile, User
import json



class UserProfileSerializer(serializers.ModelSerializer):
    # user = UserSerializer(many=False, read_only=False)
    # username = serializers.CharField(source="user.username", read_only=True)
    # email = serializers.CharField(source="user.email", read_only=True)
    # first_name = serializers.CharField(source="user.first_name", read_only=True)
    # last_name = serializers.CharField(source="user.last_name", read_only=True)
    
    class Meta:
        # user_parent = serializers.ReadOnlyField(source='user')
        model = UserProfile
        # Be careful when using tuple instead of list, make user to
        # add ',' after if you only put a single item or else
        # you'll get an error

        fields = (
                  'id',
                  'profile_pic', 
                  'address',
                  )
        # fields = '__all__'


class UserProfileCRUDSerializer(serializers.ModelSerializer):
    
    # username = serializers.CharField(source="user.username", read_only=True)
    # email = serializers.CharField(source="user.email", read_only=True)
    user_id = serializers.CharField(required=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    profile_id = serializers.CharField()

    # last_name = serializers.CharField(source="user.last_name", read_only=True)
    
    class Meta:
        # user_parent = serializers.ReadOnlyField(source='user')
        model = UserProfile
        # Be careful when using tuple instead of list, make user to
        # add ',' after if you only put a single item or else
        # you'll get an error

        fields = (
                    #user profile model
                  'id',
                  'profile_id',
                  'profile_pic', 
                  'address',

                  # user model
                  'user_id',
                  'first_name',
                  'last_name',
                  'username'
                  )
        # fields = '__all__'

    def validate(self, attrs):
        request_data = None
        user_content = {}
        user_profile_content = {}
        

        if attrs is not None:
            request_data = dict(attrs)
            print(request_data)
            if "user_id" in request_data:
                user = User.objects.get(id=int(request_data['user_id']))
                print(user)
                user.first_name = request_data['first_name']
                user.last_name = request_data['last_name']
                user.save()

            if "profile_id" in request_data:
                user_profile = UserProfile.objects.get(id=int(request_data['profile_id']))
                user_profile.address = request_data['address']
                if "profile_pic" in request_data:
                    user_profile.profile_pic = request_data['profile_pic']  
                user_profile.save()

        return request_data


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(many=False, read_only=True)

    class Meta:
        model = User
        # fields = ['url', 'username', 'first_name','email', 'groups']
        fields = (
                    'id',
                    'username', 
                    'first_name',
                    'last_name',
                    'email', 
                    'user_profile')
    # def save(self, **kwargs):
    #     return super().save(**kwargs)


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
