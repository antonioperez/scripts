from django.contrib.auth.models import User
from django import forms
from fitnotes.fitlogs.models import FitLog,Exercise,UserProfile
from django.utils.translation import ugettext_lazy as _
from django.forms import ModelForm

from django.contrib.admin.widgets import AdminDateWidget

class RegistrationForm(forms.Form):

    username = forms.RegexField(regex=r'^[a-zA-Z0-9_-]{3,10}$', max_length=10,)
    email = forms.EmailField(label=_("E-mail"))
    password1 = forms.CharField(widget=forms.PasswordInput(render_value=False),)
    password2 = forms.CharField(widget=forms.PasswordInput(render_value=False),)
    
    def clean_username(self):
        existing_user = User.objects.filter(username__iexact=self.cleaned_data['username'])
        if existing_user.exists():
            raise forms.ValidationError(_("A user with that username already exists."))
        else:
            return self.cleaned_data['username']
        
    def clean(self):
        if 'password1' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError(_("The two password fields didn't match."))
            
            elif len(self.cleaned_data['password1']) < 5:
                raise forms.ValidationError(_("Password must be 6 or more characters."))
                
        return self.cleaned_data
    
class ExerciseForm(ModelForm):
    class Meta:
        model = Exercise
        exclude=('fitlog_id')
        widgets = {
            'workout': forms.TextInput(attrs={ 'data-provide': 'typeahead','data-items':"5",
                                              'data-source':'["Pull Ups","Chin Ups", "Barbell Bench Press", "Barbell Incline Bench Press","Incline Dumbbell Flyes","Dumbbell Bench Press","Dumbbell Incline Press","Triceps Pressdown","Lying Triceps Extension","Cable Overhead Triceps Extension","Standing Calf Raises","Seated Calf Raises","Squats","One-arm Dumbbell Row","Wide-Grip Pulldown","Standing Pulldown","Straight-Arm Pulldown","Run","Boxing","Hiking","Swimming","Barbell Curl","Dumbbell Curl","Incline Dumbbell Curl","One-Arm High Cable Curl","Crunches","Sit-Ups","Oblique Crunches","Dumbbell Shoulder Press","Side Lateral Raise","One-Arm Front Cable Raises","High Cable Rear Delt Flyes","Dumbbell Shrug","Leg Press","Leg Press One-Leg","Deadlift","Leg Extensions","Romanian Deadlift","Lying Leg Curl","Weighted Bent-Knee Hip Raise","Cable Crunch","Standing Cable Wood Chopper"]' }),
        }
       
class FitlogForm(ModelForm):
  
    class Meta:
        model= FitLog
        exclude=('profile_id',)

class UserProfileForm(ModelForm):
  
    class Meta:
        model= UserProfile
        exclude=('user','bmi',)


    
            