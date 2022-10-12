from rest_framework import serializers
from ..models import Comment


class CommentsSerializer(serializers.ModelSerializer):
    # post_id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Comment
        # fields = ['id', 'comment_text', 'comment_date', 'user_id', 'post_id']
        fields = '__all__'
        
        # def get_related_field(self, model_field):
        #     return CommentsSerializer()
