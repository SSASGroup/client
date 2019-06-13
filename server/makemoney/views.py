from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from decimal import Decimal
from . import models

# Create your views here.


@csrf_exempt
def login(request):
    if request.method == 'POST':
        # print(request.POST['code'])
        SECRET = 'e429cc040940127a3db524b4f32ac811'
        APPID = 'wxdf71dcffbf958374'
        JSCODE = request.POST['code']
        url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + \
            '&secret=' + SECRET + '&js_code=' + JSCODE + '&grant_type=authorization_code'
        r = requests.get(url)
        if r.status_code == 200:
            session_key = r.json()['session_key']
            openid = r.json()['openid']
            print(session_key, '\n', openid)
            print(request.POST)
            if models.Users.objects.filter(openid=openid).exists():
                return HttpResponse(openid)
            else:
                models.Users.objects.create(openid=openid, money=30.00)
            return HttpResponse(openid)
    return HttpResponse("success")


@csrf_exempt
def releaseSurvey(request):
    if request.method == 'POST':
        # print(json.loads(request.POST['survey']))
        survey = json.loads(request.POST['survey'])
        print(survey, type(survey))
        user = models.Users.objects.get(openid=survey['idOfReleaser'])
        models.surveys.objects.create(title=survey['title'], description=survey[
            'description'], numOfQuestions=survey['numOfQuestions'],
            idOfReleaser=user, reward=survey['reward'],
            questions=survey['questions'])
        return HttpResponse('You post')
    return HttpResponse('You get')


@csrf_exempt
def home(request):
    sureys = models.surveys.objects.all().filter(stop=False)
    res = []
    for s in sureys:
        values = {}
        values['id'] = s.id
        values['title'] = s.title
        values['description'] = s.description
        values['numOfQuestions'] = s.numOfQuestions
        values['idOfReleaser'] = s.idOfReleaser.openid
        values['reward'] = float(s.reward)
        values['questions'] = s.questions
        res.append(values)
    return HttpResponse(json.dumps(res), content_type="application/json")


@csrf_exempt
def submitSurvey(request):
    if request.method == 'POST':
        answer = json.loads(request.POST['answer'])
        print(answer)
        Releaser = models.Users.objects.get(openid=answer['idOfReleaser'])
        print(Releaser.money)
        if Releaser.money < answer['reward']:
            return HttpResponse('The Publisher does not have enough balance!')
        Releaser.money -= Decimal(answer['reward'])
        Answerer = models.Users.objects.get(openid=answer['answerer'])
        Answerer.money -= Decimal(answer['reward'])
        models.answerOfsurvey.objects.create(title=answer['title'], numOfQuestions=answer['numOfQuestions'],
                                             idOfReleaser=Releaser, idOfSurvey=answer[
                                                 'id'], questions=answer['questions'],
                                             nameOfUser=answer['nameOfUser'])
        return HttpResponse('You get payed!')
    return HttpResponse('POST')
