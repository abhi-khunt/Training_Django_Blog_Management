from django.http import HttpResponse
from django.shortcuts import render,redirect


def home_view(request):
    token = request.COOKIES.get("access_token")
    if not token:
        return render(request, "guest_home.html")
    else:
        return render(request,"user_home.html")

def register_view(request):
    return render(request,"register.html")

def login_view(request):
    return render(request,"login.html")

def create_blog_view(request):
    return render(request,"create_blog.html")

def my_blog_view(request):
    return render(request,"my_blog.html")

def edit_blog_view(request,id):
    return render(request,"edit_blog.html",{"id":id})

def read_blog_view(request,id):
    access_token = request.COOKIES.get("access_token")

    if access_token:
        layout = "user_home.html"
    else:
        layout = "guest_home.html"

    return render(
        request,
        "read_blog.html",
        {
            "blog_id": id,
            "layout": layout
        }
    )
    
def profile_view(request):
    return render(request,"profile.html")

def logout_view(request):
    response = redirect("home")

    response.delete_cookie("access_token")
    return response

def admin_view(request):
    return render(request,"admin_dashboard.html")