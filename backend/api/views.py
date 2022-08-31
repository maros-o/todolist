from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView)
from .serializers import *
from api.models import Note
from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    user_notes = user.note_set.all().order_by('-created')
    serializer = NoteSerializer(user_notes, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createNote(request):
    user = request.user
    note_body = request.data['body']

    if not note_body:
        return Response('Empty note_body', status=status.HTTP_400_BAD_REQUEST)

    note = Note.objects.create_note(user=user, body=note_body)

    user_notes = user.note_set.all().order_by('-created')
    serializer = NoteSerializer(user_notes, many=True)

    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateNote(request, pk):
    data = request.data
    user = request.user

    if not Note.objects.filter(id=pk).exists():
        return Response('Invalid primary key', status=status.HTTP_400_BAD_REQUEST)

    note = Note.objects.get(id=pk)

    if note.user != user:
        return Response('This note is not yours', status=status.HTTP_400_BAD_REQUEST)

    note.body = data['note_body']
    note.save()
    user_notes = user.note_set.all().order_by('-created')
    serializer = NoteSerializer(user_notes, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteNote(request, pk):
    user = request.user

    if not Note.objects.filter(id=pk).exists():
        return Response('Invalid primary key', status=status.HTTP_400_BAD_REQUEST)

    note = Note.objects.get(id=pk)

    if note.user != user:
        return Response('This note is not yours', status=status.HTTP_400_BAD_REQUEST)

    note.delete()
    user_notes = user.note_set.all().order_by('-created')
    serializer = NoteSerializer(user_notes, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createUser(request):
    data = request.data

    username = data['username']
    email = data['email']
    password = data['password']

    if User.objects.filter(username=username).exists():
        print('createUser - username ' + username + ' already exists')
        return Response("Username already exists", status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(
        username=username, password=password, email=email)

    refresh = RefreshToken.for_user(user)
    refresh['username'] = username
    response = {'access': str(refresh.access_token), 'refresh': str(refresh)}

    return Response(response, status=status.HTTP_201_CREATED)
