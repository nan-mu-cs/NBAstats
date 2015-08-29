__author__ = 'andyyang'

from django import forms
from django.contrib.auth.models import User
from NBAindex.models import UserProfile

class UserCreationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    class Meta:
        model = User
        fields = ('username', 'password')

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('email',)

