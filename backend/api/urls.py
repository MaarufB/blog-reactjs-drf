from rest_framework import routers
from django.urls import path, include
from . import views
# from rest_framework_simplejwt.views import (
#     # TokenObtainPairView, # we're no longer using this because we now have a customize
#     TokenRefreshView,
# )

# from .views import MyTokenObtainPairView
from . import views


# router = routers.DefaultRouter()
# router.register('blog/',views.BlogListAPIView.as_view())


urlpatterns = [

    # path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('register/', views.RegisterAPIView.as_view(), name='register'),
    # path('login/', views.LoginAPIView.as_view(), name='login'),
    # path('logout/', TokenRefreshView.as_view(), name='logout'),

    path('blog/', views.BlogListAPIView.as_view(), name='blogs'),
    # path('api/', include(router.urls)),
    path('blog/<int:pk>/', views.BlogDetailAPIView.as_view(), name='blog'),


    #comment
    path('post-comment/', views.PostCommentGetPostAPI.as_view(), name='post-comment'),
    path('post-comment/<int:pk>/', views.PostCommentGetPostAPI.as_view(), name='post-comment'),   
]