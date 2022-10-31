from rest_framework import serializers
from ..models import Comment
from ..model_serializer.user_profile_serializer import UserSerializer

class CommentsSerializer(serializers.ModelSerializer):
    # post_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user = UserSerializer(many=False)

    class Meta:
        model = Comment
        fields = ['id', 'comment_text', 'comment_date', 'user', 'post']
        
        # fields = '__all__'
        
        # def get_related_field(self, model_field):
        #     return CommentsSerializer()

class CommentsCRUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'