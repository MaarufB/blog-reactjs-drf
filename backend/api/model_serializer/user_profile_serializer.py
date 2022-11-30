from django.contrib.auth.models import User, Group
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from ..models import UserProfile, User
import json
from django.core.files import File


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
                  'first_name',
                  'last_name',
                  'profile_pic', 
                  'address',
                  'user_id'
                  )
        # fields = '__all__'


class UserProfileCRUDSerializer(serializers.ModelSerializer):
    
    # username = serializers.CharField(source="user.username", read_only=True)
    # email = serializers.CharField(source="user.email", read_only=True)
    user_id = serializers.CharField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    profile_id = serializers.CharField(required=False)

    # last_name = serializers.CharField(source="user.last_name", read_only=True)
    
    class Meta:
        # user_parent = serializers.ReadOnlyField(source='user')
        model = UserProfile
        # Be careful when using tuple instead of list, make user to
        # add ',' after if you only put a single item or else
        # you'll get an error

        fields = (
                    #user profile model
                #   'id',
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

    # def validate(self, attrs):
    #     request_data = None
    #     user = None
    #     user_profile= None

    #     user_fields = ['user_id', 'first_name', 'last_name']
    #     profile_fields = ['profile_id', 'profile_pic', 'address']

    #     if not attrs is None:

    #         received_data = dict(attrs)
    #         # print(f"Data received: {received_data}")

    #         # test if the fields is exist in the database in the first place

    #         # check if user is exist
    #         user_is_exist = User.objects.filter(pk=int(received_data['user_id'])).exists()
    #         if user_is_exist:
    #             user = User.objects.filter(id__exact=int(received_data['user_id'])).values()[0]
    #             # print(user)

    #         user_profile_exist = UserProfile.objects.filter(user_id=int(received_data['user_id'])).exists()
    #         if user_profile_exist:
    #             user_profile = UserProfile.objects.filter(user_id=int(received_data['user_id'])).values()[0]
    #             # user_profile.first_name = received_data['first_name']
    #             # user_profile.last_name = received_data['last_name']
    #             # user_profile.address = received_data['address']

    #             # user_profile.save()
    #             # profile_list = UserProfile.objects.filter(user_id__exact=int(received_data['user_id'])).values()[0]
    #             # profile_list = UserProfile.objects.get(user_id=int(received_data['user_id']))
    #             # update_profile = UserProfile.objects.filter(user_id__exact=int(request_data['id'])).update(last_name = "Burad(updated")


    #             # print(update_profile)
                
    #             print(f"User Profile is exist")




    #     # return {'user': user, 'user_profile': user_profile}

    #     return True

    # def is_valid(self):
    #     # data = hasattr()
    #     # print(data)
    #     return True

    # def save(self,*args, **kwarg):
    #     # print("Save overrided")
    #     # print(kwarg)
    #     return "Saved"


    def create_update(self, validated_data, user_id):
        
        if validated_data:
            user_id = user_id #validated_data['user_id']
            user_exist = User.objects.filter(pk=user_id).exists()
            # print(validated_data)
            
            if user_exist:
                user = User.objects.get(id=int(user_id))
                profile_exist = UserProfile.objects.filter(user_id = user_id).exists()

                if profile_exist:
                    # If the profile is exist, we just need to perform an update here 
                    print("exist")
                    # user_profile = UserProfile.objects.get(user_id=int(user_id))
                    user_profile = UserProfile.objects.filter(user_id__exact=int(user_id)).update(**validated_data)
   
                    # This works
                    # if ""
                    # user_profile.first_name = validated_data['first_name']
                    # user_profile.last_name = validated_data['last_name']
                    # user_profile.address = validated_data['address']


                    # user_profile.save()
                    print(user_profile)
                    print(f"Profile Updated")
                    
                    return validated_data
                    # user_profile = UserProfile.objects.get(user_id=int(validated_data['user_id']))

                elif not profile_exist:
                    # perform a creation of the user profile
                    print("Not Exist")
                    user_profile_fields = ['last_name', 'first_name', 'address', 'profile_pic']
                    
                    user_profile = UserProfile.objects.create(**validated_data)
                    user_profile.save()


                    
                



        # return super().create(validated_data)

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
            last_name=validated_data['last_name'],
            # address= validated_data['address']         
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
