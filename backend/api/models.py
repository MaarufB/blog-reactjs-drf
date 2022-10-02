from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

# Create your models here.

def upload_profile(instance, filename):
    return 'profile/{filename}'.format(filename=filename)

class UserProfile(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to=upload_profile, null=True, blank=True)
    test_data = models.CharField(max_length=200, null=True)
    
    def __str__(self):
        return str(self.user)

class Post(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True)
    post_title = models.CharField(max_length=255, null=True)
    image = models.ImageField(upload_to=upload_to, blank=True, null=True) #default="uploads/default.jpg"
    body = models.TextField(null=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "post"
        ordering = ['-pub_date']

    def __str__(self):
        return self.post_title


class Comment(models.Model):
    post: Post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE, null=True) #related_name="comments"
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    comment_text = models.TextField()
    comment_image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    comment_date = models.DateTimeField(auto_now_add=True)
    comment_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "comment"
        ordering = ['-comment_date']

    # def __str__(self):
    #     summary = None
    #     if len(self.comment_text) > 10:
    #         return self.comment_text
    #     else:
    #         summary = f"{self.post.user} comment"
        # return summary

class SubComment(models.Model):
    comment_id: Comment =models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    comment_text = models.TextField()
    comment_image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    comment_date = models.DateTimeField(auto_now_add=True)
    comment_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "subcomment"
        ordering = ['-comment_date']

    def __str__(self) -> str:
        return self.comment_text