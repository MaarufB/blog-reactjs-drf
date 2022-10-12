from django.contrib.auth.models import User, Group
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from ..models import UserProfile, User



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
                  'test_data'
                  )
        # fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(many=False, read_only=True)
    profile_pic = serializers.CharField(source='userprofile.profile_pic')

    class Meta:
        model = User
        # fields = ['url', 'username', 'first_name','email', 'groups']
        fields = ['username', 'first_name','email', 'profile_pic', 'user_profile']



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
