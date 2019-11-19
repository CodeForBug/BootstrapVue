from django.shortcuts import render
import json
import math
from django.http import HttpResponse
from BackEnd.models import Books, Movies

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
        bookname = request.POST.get('bookname')
        bookauthor = request.POST.get('bookauthor')
        booktype = request.POST.get('booktype')
        bookpress = request.POST.get('bookpress')
        save_path = '%s/book/%s' % (settings.MEDIA_ROOT, file.name)
        url = request.get_host()+"/media/book/"+file.name
        Books.objects.create(book_name=bookname, book_author=bookauthor, book_press=bookpress,
                             book_category=booktype, book_url=url)
        with open(save_path, 'wb') as f:
            if file.multiple_chunks():
                for myf in file.chunks():
                    f.write(myf)
            else:
                f.write(file.read())
            return HttpResponse('文件上传')


def get_book_list(request):
    if request.method == 'POST':
        pn = request.POST.get('offset')[0]
        start = int(pn) * 10
        end = (int(pn) + 1) * 10
        book_list = []
        try:
            books = Books.objects.all()[start:end]
            total = Books.objects.all().count()
            for book in books:
                book_dict = {}
                book_dict["id"] = book.pk
                book_dict["name"] = book.book_name
                book_dict["category"] = book.book_category
                book_dict["author"] = book.book_author
                book_dict["createTime"] = book.create_time.strftime('%Y-%m-%d %H:%M:%S')
                book_dict["press"] = book.book_press
                book_dict["url"] = book.book_url
                book_list.append(book_dict)
            result = {
                "status": 200,
                "data": {
                    "total": total,
                    "currentPage": pn,
                    "bookList": book_list
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


def delete_book_by_id(request):
    if request.method == 'POST':
        pk = request.POST.getlist('id')
        try:
            for i in pk:
                Books.objects.filter(pk=int(i)).delete()
            result = {
                "status": 200,
                "data": {},
                "msg": "success"
            }
        except Exception as e:
            result = {
                "status": 0,
                "data": {},
                "msg": e
            }
        return HttpResponse(json.dumps(result), content_type="application/json")
