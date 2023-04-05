from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response


# TODO: Endpoints to Create
# - Register User
# - Retrieve Users
# - Activate User

class RegisterView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        try:
            data = request.data

            username = data['username']
            email = data['email']
            password = data['password']
            re_password = data['re_password']

            first_name = data['first_name']
            last_name = data['last_name']

        except:
            return Response(
                {'error': 'Something went wrong when registering an account'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RetrieveUserView(APIView):
    pass
