from django.shortcuts import render
import json
from django.http import HttpResponse
from BackEnd.models import Books,Movies

from django.conf import settings
# Create your views here.


def index(request):
    return render(request, 'BootstrapVue/index.html')


def first(request):
    return render(request, 'BootstrapVue/first.html')


def second(request):
    return render(request, 'BootstrapVue/second.html')


def third(request):
    return render(request, 'BootstrapVue/third.html')


def get_user_name(request):
    result = {
        "status": 200,
        "data": {
            "name": "赵文龙"
        },
        "msg": "success"
    }
    return HttpResponse(json.dumps(result), content_type="application/json")


def get_amount_of_books(request):
    try:
        amount = Books.objects.count()
        result = {
            "status": 200,
            "data": {
                "amount": amount
            },
            "msg": "success"
        }
    except Exception as e:
        result = {
            "status": 0,
            "data": {},
            "msg": e
        }
    return HttpResponse(json.dumps(result), content_type="application/json")


def get_amount_of_movies(request):
    try:
        amount = Movies.objects.count()
        result = {
            "status": 200,
            "data": {
                "amount": amount
            },
            "msg": "success"
        }
    except Exception as e:
        result = {
            "status": 0,
            "data": {},
            "msg": e
        }
    return HttpResponse(json.dumps(result), content_type="application/json")


def add_book(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        save_path = '%s/book/%s' % (settings.MEDIA_ROOT, file.name)
        with open(save_path, 'wb') as f:
            if file.multiple_chunks():
                for myf in file.chunks():
                    f.write(myf)
            else:
                f.write(file.read())
            return HttpResponse('文件上传')
