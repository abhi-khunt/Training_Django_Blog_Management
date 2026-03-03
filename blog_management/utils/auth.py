import jwt
import datetime
from users.models import User
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

SECRET_KEY = "your-secret-key"


def create_access_token(user_id):

    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=30),
        "iat": datetime.datetime.now(datetime.timezone.utc),
        "type": "access"
    }

    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

from rest_framework.exceptions import AuthenticationFailed

def verify_access_token(token):


    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    user_id = payload.get("user_id")
    print(user_id)
    user = User.objects.get(pk=user_id)
    return {"user_id":user.id,"username":user.username}

