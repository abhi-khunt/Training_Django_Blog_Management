from django.db import models
from users.models import User
# Create your models here.
class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blogs")
    author = models.CharField(max_length=50)
    blog_title = models.CharField(max_length=100)
    blog_thumbnail = models.ImageField(upload_to="blog_thumbnail/",default="blog_thumbnail/default.png",blank=True)
    blog_content = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    