from django.urls import path
from .views import *


urlpatterns = [
    path('', getRoutes),
    path('notes/', getNotes, name='notes'),
    path('notes/create/', createNote, name='notes-create'),
    path('notes/update/<str:pk>', updateNote, name='note-update'),
    path('notes/delete/<str:pk>', deleteNote, name='note-delete'),
    path('register/', createUser, name='register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
