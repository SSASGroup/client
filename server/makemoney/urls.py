from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login),
    path('releaseSurvey/', views.releaseSurvey),
    path('home/', views.home)
]
