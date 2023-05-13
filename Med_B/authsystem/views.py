from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from . forms import UserRegisterForm
from django.contrib.auth.decorators import login_required
from .models import Profile

# Create your views here.

def index(request):
    return render(request, 'index.html')

def loginP(request):
    return render(request, 'login.html', name='login')

def register(request):
    if request.method == "POST":
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Hi, {username}, your account was created successfully. Login Here...')
            return redirect('login')
    else:
        form = UserRegisterForm()

    return render(request, 'register.html',{'form': form})

@login_required()
def dashboard(request):
    return render(request, 'dashboard.html')

@login_required()
def profile(request):
    return render(request, 'profile.html')

@login_required
def edit_profile(request):
    try:
        profile = request.user.profile
    except Profile.DoesNotExist:
        profile = Profile(user=request.user)

    if request.method == 'POST':
        # Update user details
        request.user.first_name = request.POST['first_name']
        request.user.last_name = request.POST['last_name']
        request.user.email = request.POST['email']
        request.user.save()

        # Update profile details
        profile.age = request.POST.get('age', None)
        profile.gender = request.POST.get('gender', None)
        profile.address = request.POST.get('address', None)
        profile.phone = request.POST.get('phone', None)

        # Update profile picture
        if 'picture' in request.FILES:
            profile.picture = request.FILES['picture']

        profile.save()

        return redirect('profile')

    return render(request, 'edit_profile.html', {'profile': profile})
