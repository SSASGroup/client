from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login),
    path('releaseSurvey/', views.releaseSurvey),
    path('home/', views.home),
    path('submitSurvey/', views.submitSurvey),
    path('mySurvey/', views.mySurvey),
    path('surveyAnswerList/', views.surveyAnswerList),
    path('stopSurvey/', views.stopSurvey),
    path('releaseResume/', views.releaseResume),
    path('resume/', views.resume),
    path('submitResume/', views.submitResume),
    path('myResume/', views.myResume),
    path('resumeAnswerList/', views.resumeAnswerList),
    path('stopResume/', views.stopResume),
    path('money/', views.money),
    path('searchSurvey/', views.searchSurvey),
    path('searchResume/', views.searchResume)
]
