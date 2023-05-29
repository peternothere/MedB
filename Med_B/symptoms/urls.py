from django.urls import path
from . import views

#app_name = 'symptoms'

urlpatterns = [
    path("", views.index, name="disease_prediction"),
    path('disease_prediction',views.index),
]
