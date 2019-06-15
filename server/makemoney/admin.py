from django.contrib import admin
from .models import Users, surveys, answerOfresume

# Register your models here.
admin.site.register(Users)
admin.site.register(surveys)
admin.site.register(answerOfresume)
