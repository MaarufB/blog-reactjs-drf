from django.urls import path
from . import views

urlpatterns = [
    path('get-test/', views.TestApiView.as_view(), name="get-test"),
]