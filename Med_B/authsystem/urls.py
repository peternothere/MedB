from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_view


urlpatterns = [
    path('',views.index, name='index'),
    path('register/',views.register, name='register'),
    path('profile/',views.profile, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('dashboard/',views.dashboard, name='dashboard'),
    path('login/', auth_view.LoginView.as_view(template_name = 'login.html'), name = 'login'),
    path('logout/', auth_view.LogoutView.as_view(template_name = 'logout.html'), name = 'logout'),
    path('read_response/', views.read_response, name='read_response'),
    path('save_user_input/', views.save_user_input, name='save_user_input'),
    
    
]
