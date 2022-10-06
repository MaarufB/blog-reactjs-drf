from rest_framework import routers
from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    # TokenObtainPairView, # we're no longer using this because we now have a customize
    TokenRefreshView,
)

from .views import MyTokenObtainPairView
from . import views
from .api_views import (
                        profile_view, 
                        comment_view,
                        post_view,
                        )

urlpatterns = [

    #Authentications
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    # path('logout/', TokenRefreshView.as_view(), name='logout'),

    path('blog/', post_view.BlogListAPIView.as_view(), name='blogs'),
    path('blog/<int:pk>/', post_view.BlogDetailAPIView.as_view(), name='blog'),

    #comment
    path('post-comment/', comment_view.PostCommentGetPostAPI.as_view(), name='post-comment'),
    path('post-comment/<int:pk>/', comment_view.PostCommentDetailAPIView.as_view(), name='post-comment'),

    # user profile
    path('user-profile/', profile_view.ProfilePostAPIView.as_view()),
    # path('user-profile/<int:pk>/', views.ProfileAPIView.as_view(), name='user-profile'),

    path('user-profile/<int:pk>/', profile_view.ProfileAPIView.as_view(), name='user-profile'),
]