from ..model_serializer.user_profile_serializer import (
                            RegisterUserSerializer,
                            UserProfileSerializer,
                            UserSerializer,
                            UserProfileCRUDSerializer
                        )

from ..models import (
                        UserProfile,
                        User
                    )

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


from rest_framework.parsers import MultiPartParser, FormParser

class ProfileAPIView(APIView):
    # permission_classes = (IsAuthenticated,)
    perser_classes = (MultiPartParser, FormParser)

    def get(self, request, pk, format=None):
        profile_model = User.objects.get(id=pk)
        
        profile_serializer = UserSerializer(instance=profile_model, many=False)
        # print(f"serializer {profile_serializer.data}")

        return Response(profile_serializer.data)

    def put(self, request, pk, format=None):
        auth_content = request.auth
        # print(f"user auth: {auth_content}")
        # print(f"request: {request.data}")

        user = User.objects.get(id=pk)
        profile_serializer = UserProfileCRUDSerializer(instance=user, data=request.data)
        print(request.FILES)
        if profile_serializer.is_valid():
            validated_data = profile_serializer.validated_data
            print(validated_data)
            profile_serializer.create_update(validated_data)
    
            return Response(profile_serializer.data)

        else:
            print(f"Request is not valid")
            return Response("Not Valid", status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        pass

class ProfilePostAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    perser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):

        return Response({"message": "None Necessary!"})

    def post(self, request, format=None):
        serializer = UserProfile(data=request.data)

        if serializer.is_valid():
            serializer.save()
            print(request)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)