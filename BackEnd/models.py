from django.db import models

# Create your models here.


class Books (models.Model):
    book_name = models.CharField(max_length=255)
    book_author = models.CharField(max_length=255)
    book_press = models.CharField(max_length=255)
    book_category = models.CharField(max_length=255)
    create_time = models.DateTimeField(auto_now=True)
    book_url = models.CharField(max_length=255)


class Movies (models.Model):
    movie_name = models.CharField(max_length=255)
    movie_date = models.CharField(max_length=255)
    movie_star = models.CharField(max_length=255)
    movie_category = models.CharField(max_length=255)
    movie_score = models.DecimalField(max_digits=1, decimal_places=0.1)
    create_time = models.DateTimeField(auto_now=True)
    movie_url = models.CharField(max_length=255)
