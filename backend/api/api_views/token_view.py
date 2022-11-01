from rest_framework.views import APIView
from rest_framework.response import  Response
from rest_framework import status
# from ..serializers import (
#                             RegisterUserSerializer,
#                             UserProfileSerializer,
#                             UserProfile,
#                             )

from ..model_serializer.user_profile_serializer import (
                            RegisterUserSerializer,
                            UserProfileSerializer,
                            UserProfile,
                            )

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    # def get_objects(self, pk):
    #     try:
    #         return UserProfile.objects.get(user_id=pk)
    #     except UserProfile.DoesNotExist:
    #         raise Http404    
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        user_model = None  
        user_profile_serializer = None

        if UserProfile.objects.filter(user_id=user.id).exists():
            user_model = UserProfile.objects.get(user_id=user.id)
            user_profile_serializer = UserProfileSerializer(instance=user_model)
            
            token['user_profile'] = user_profile_serializer.data
        else:
            token['user_profile'] = None
        
        return token

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
    ]
    return Response(routes)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterAPIView(APIView):
    # queryset = User.objects.all()
    # permission_classes = (AllowAny,)
    # serializer_class = RegisterUserSerializer
    # authentication_classes = []
    

    def post(self, request, *args, **kwargs):
        serializer = RegisterUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    