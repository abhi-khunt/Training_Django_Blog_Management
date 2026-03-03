from django.urls import path
from . import views
urlpatterns = [
    path('users/',views.ProfileListView.as_view()),
    path('user-edit/<int:id>/',views.UserView.as_view())
]
