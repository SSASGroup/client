
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from decimal import Decimal
from . import models
from django.db.models import Q

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
        # print(survey, type(survey))
        user = models.Users.objects.get(openid=survey['idOfReleaser'])
        models.surveys.objects.create(title=survey['title'], description=survey[
            'description'], numOfQuestions=survey['numOfQuestions'],
            idOfReleaser=user, reward=survey['reward'],
            questions=survey['questions'])
        return HttpResponse('releaseSurvey')
    return HttpResponse('You get')


@csrf_exempt
def releaseResume(request):
    if request.method == 'POST':
        resume = json.loads(request.POST['resume'])
        print(resume)
        models.resumes.objects.create(title=resume['title'],
                                      description=resume['description'],
                                      idOfReleaser=resume['idOfReleaser'],
                                      reward=resume['reward'],
                                      questions=resume['questions'])
        return HttpResponse('release resume success')
    return HttpResponse('releaseResume')


@csrf_exempt
def home(request):
    """
    加载主页时获取问卷列表，需要去除自己已经回答的和停止回答的。
    本来把自己发布的也去掉，但是又考虑了一下，如果这样做的话那么用户可能不知道自己发布成功没有
    所以最终决定还是不去掉了
    """
    if request.method == 'POST':
        idOfUser = request.POST['idOfUser']
        surveys = models.surveys.objects.all().filter(stop=False)
        # .exclude(idOfReleaser=idOfUser)
        # print('POST', request.POST)
        idOfSurveyAnswered = models.Users.objects.get(
            openid=idOfUser).idOfSurveyAnswered
        print(idOfSurveyAnswered)
        for id in idOfSurveyAnswered:
            surveys = surveys.exclude(id=id)
        res = []
        for s in surveys:
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
    return HttpResponse('home')


@csrf_exempt
def resume(request):
    """
    获取简历列表，思路和上面获取问卷的思路一样，也是只除去已经填过的简历
    """
    if request.method == 'POST':
        idOfUser = request.POST['idOfUser']
        resumes = models.resumes.objects.all().filter(stop=False)
        idOfResumeAnswered = models.Users.objects.get(
            openid=idOfUser).idOfResumeAnswered
        for id in idOfResumeAnswered:
            resumes = resumes.exclude(id=id)
        res = []
        for r in resumes:
            values = {}
            values['id'] = r.id
            values['title'] = r.title
            values['description'] = r.description
            values['idOfReleaser'] = r.idOfReleaser
            values['reward'] = float(r.reward)
            values['questions'] = r.questions
            res.append(values)
        return HttpResponse(json.dumps(res), content_type="application/json")
    return HttpResponse('resume')


@csrf_exempt
def submitSurvey(request):
    if request.method == 'POST':
        answer = json.loads(request.POST['answer'])
        print(answer)
        Releaser = models.Users.objects.get(openid=answer['idOfReleaser'])
        print(Releaser.money)
        if Releaser.money < answer['reward']:
            return HttpResponse('bad')
        Releaser.money -= Decimal(answer['reward'])
        Releaser.save()
        Answerer = models.Users.objects.get(openid=answer['answerer'])
        Answerer.money += Decimal(answer['reward'])
        Answerer.idOfSurveyAnswered.append(answer['id'])
        Answerer.save()
        models.answerOfsurvey.objects.create(title=answer['title'], numOfQuestions=answer['numOfQuestions'],
                                             idOfReleaser=Releaser, idOfSurvey=answer[
                                                 'id'], questions=answer['questions'],
                                             nameOfUser=answer['nameOfUser'])
        print('return?')
        return HttpResponse('payed')
    return HttpResponse('submitSurvey')


@csrf_exempt
def submitResume(request):
    if request.method == 'POST':
        answer = json.loads(request.POST['answer'])
        print(answer)
        Releaser = models.Users.objects.get(openid=answer['idOfReleaser'])
        print(Releaser.money)
        if Releaser.money < answer['reward']:
            return HttpResponse('bad')
        Releaser.money -= Decimal(answer['reward'])
        Releaser.save()
        Answerer = models.Users.objects.get(openid=answer['answerer'])
        Answerer.money += Decimal(answer['reward'])
        Answerer.idOfResumeAnswered.append(answer['id'])
        Answerer.save()
        photo = request.FILES.get('img')
        models.answerOfresume.objects.create(title=answer['title'], idOfReleaser=Releaser,
                                             idOfResume=answer['id'], questions=answer['questions'],
                                             nameOfUser=answer['nameOfUser'], photo=photo)
        return HttpResponse('payed')
    return HttpResponse('submitResume')


@csrf_exempt
def mySurvey(request):
    if request.method == 'POST':
        openid = request.POST['id']
        print(openid)
        user = models.Users.objects.get(openid=openid)
        surveys = models.surveys.objects.all().filter(idOfReleaser=user)
        res = []
        for s in surveys:
            values = {}
            values['id'] = s.id
            values['title'] = s.title
            values['description'] = s.description
            res.append(values)
        return HttpResponse(json.dumps(res), content_type="application/json")
    return HttpResponse('mySurvey')


@csrf_exempt
def myResume(request):
    if request.method == 'POST':
        openid = request.POST['id']
        user = models.Users.objects.get(openid=openid)
        resumes = models.resumes.objects.all().filter(idOfReleaser=user)
        res = []
        for r in resumes:
            values = {}
            values['id'] = r.id
            values['title'] = r.title
            values['description'] = r.description
            res.append(values)
        return HttpResponse(json.dumps(res), content_type="application/json")
    return HttpResponse('mySurvey')



@csrf_exempt
def surveyAnswerList(request):
    if request.method == 'POST':
        idOfSurvey = request.POST['idOfSurvey']
        answers = models.answerOfsurvey.objects.all().filter(idOfSurvey=idOfSurvey)
        res = []
        for s in answers:
            values = {}
            values['nameOfUser'] = s.nameOfUser
            values['title'] = s.title
            values['questions'] = s.questions
            values['id'] = s.id
            res.append(values)
        return HttpResponse(json.dumps(res), content_type="application/json")
    return HttpResponse('surveyAnswerList')


@csrf_exempt
def resumeAnswerList(request):
    if request.method == 'POST':
        idOfResume = request.POST['idOfResume']
        print(request.POST)
        answers = models.answerOfresume.objects.all().filter(idOfResume=idOfResume)
        res = []
        for s in answers:
            values = {}
            values['nameOfUser'] = s.nameOfUser
            values['title'] = s.title
            values['questions'] = s.questions
            values['id'] = s.id
            values['imgSrc'] = s.photo.url
            res.append(values)
        print(res)
        return HttpResponse(json.dumps(res), content_type="application/json")
    return HttpResponse('surveyAnswerList')  


@csrf_exempt
def stopSurvey(request):
    if request.method == 'POST':
        idOfSurvey = request.POST['idOfSurvey']
        survey = models.surveys.objects.get(id=idOfSurvey)
        survey.stop = True
        survey.save()
        return HttpResponse('Stop survey!')
    return HttpResponse('stopSurvey')

@csrf_exempt
def stopResume(request):
    if request.method == "POST":
        idOfResume = request.POST['idOfResume']
        resume = models.resumes.objects.get(id=idOfResume)
        resume.stop = True
        resume.save()
        return HttpResponse('Stop resume!')
    return HttpResponse('stopResume')


@csrf_exempt
def money(request):
    if request.method == "POST":
        openid = request.POST['id']
        user = models.Users.objects.get(openid=openid)
        return HttpResponse(user.money)
    return HttpResponse('money')


@csrf_exempt
def searchSurvey(request):
    if request.method == 'POST':
        value = request.POST['value']
        openid = request.POST['openid']
        surveys = models.surveys.objects.all().filter(stop=False)
        idOfSurveyAnswered = models.Users.objects.get(
            openid=openid).idOfSurveyAnswered
        for id in idOfSurveyAnswered:
            surveys = surveys.exclude(id=id)
        surveys = surveys.filter(Q(title__icontains=value) | Q(description__icontains=value))
        res = []
        for s in surveys:
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
    return HttpResponse('searchSurvey')


@csrf_exempt
def searchResume(request):
    if request.method == 'POST':
        openid = request.POST['openid']
        value = request.POST['value']
        resumes = models.resumes.objects.all().filter(stop=False)
        idOfResumeAnswered = models.Users.objects.get(
            openid=openid).idOfResumeAnswered
        for id in idOfResumeAnswered:
            resumes = resumes.exclude(id=id)
        resumes = resumes.filter(Q(title__icontains=value) | Q(description__icontains=value))
        res = []
        for r in resumes:
            values = {}
            values['id'] = r.id
            values['title'] = r.title
            values['description'] = r.description
            values['idOfReleaser'] = r.idOfReleaser
            values['reward'] = float(r.reward)
            values['questions'] = r.questions
            res.append(values)
        return HttpResponse(json.dumps(res), content_type="application/json")
    return HttpResponse('searchResume')