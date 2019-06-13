from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField

# Create your models here.


class Users(models.Model):
    """docstring for User"""
    openid = models.CharField(max_length=100, primary_key=True)
    money = models.DecimalField(max_digits=8, decimal_places=2, )

    def __str__(self):
        return self.openid


class Test(models.Model):
    name = models.CharField(max_length=10)


class surveys(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=100, null=True)
    numOfQuestions = models.IntegerField()
    idOfReleaser = models.ForeignKey(
        Users, on_delete=models.CASCADE)
    reward = models.DecimalField(max_digits=8, decimal_places=2)
    questions = ArrayField(JSONField(default=dict))
