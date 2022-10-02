from ..serializers import (
                            RegisterUserSerializer,
                            UserProfileSerializer,
                            UserSerializer
                        )

from ..models import (
                        UserProfile
                    )

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


from rest_framework.parsers import MultiPartParser, FormParser

class ProfileAPIView(APIView):
    # permission_classes = (IsAuthenticated,)
    perser_classes = (MultiPartParser, FormParser)


    def get(self, request, pk, format=None):
        profile_model = UserProfile.objects.get(user=pk)
        profile_serializer = UserProfileSerializer(instance=profile_model, many=False)

        return Response(profile_serializer.data)

    def put(self, request, pk, format=None):
        profile_model = UserProfile.objects.get(user=pk)
        print(request.data)
        profile_serializer = UserProfileSerializer(instance=profile_model, data=request.data)

        if profile_serializer.is_valid():
            profile_serializer.save()

            return Response(profile_serializer.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        pass


class ProfilePostAPIView(APIView):
    # permission_classes = (IsAuthenticated,)
    perser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):
        
        return Response({"message": "None Necessary!"})

    def post(self, request, format=None):
        serializer = UserProfile(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
