from django.contrib import admin
from .models import Post, Comment, SubComment, UserProfile
# Register your models here.

# admin.site.register((Post,))
admin.site.register((Post, Comment, SubComment, UserProfile))