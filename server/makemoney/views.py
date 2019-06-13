from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import requests
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
            if models.Users.objects.exists(openid=openid):
                return HttpResponse('existed!')
            else:
                models.Users.objects.create(openid=openid, money=30.00)
            return HttpResponse('login!')
    return HttpResponse("success")
