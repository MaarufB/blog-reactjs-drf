from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Post(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        null=True
        )

    title = models.CharField(max_length=200)
    body = models.TextField()
    image_url = models.ImageField(upload_to="images/", null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    class Meta:
        db_table = "Post"
        ordering = ['created']


class Comment(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True
        )
    post = models.ForeignKey(
        Post, 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True
        )

    comment = models.TextField(null=False)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)    

    class Meta:
        db_table = "Comment"
        ordering = ["created"]