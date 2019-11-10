from django.urls import path
from . import views
from django.views.static import serve


urlpatterns = [
    path("index/", views.index),
    path('first/', views.first),
    path('second/', views.second),
    path('third/', views.third),
    path('username/', views.get_user_name),
    path('booksamount/', views.get_amount_of_books),
    path('moviesamount/', views.get_amount_of_movies),
    path('first/addbook/', views.add_book),
]