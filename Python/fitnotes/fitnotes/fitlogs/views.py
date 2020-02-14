
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.forms.formsets import formset_factory

from fitnotes.fitlogs.forms import *
from fitnotes.fitlogs.models import *
from django.contrib.auth.decorators import login_required
from math import pow
from django.contrib import auth

def RegisterUser(request):
    if request.method =='POST':
        form= RegistrationForm(request.POST)
        user_profile_form = UserProfileForm(request.POST)  
        if form.is_valid() and user_profile_form.is_valid():
            cd= form.cleaned_data
            pfcd = user_profile_form.cleaned_data
            newuser= User.objects.create_user(cd['username'].lower(), cd['email'], cd['password1'])
                                                                                                                                                                                                                                                         
            new_profile = UserProfile(user=newuser,curr_weight = pfcd['curr_weight'],feet = pfcd['feet'],inches=pfcd['inches'],bmi=0)
            new_profile.save()
        
            user = auth.authenticate(username=cd['username'].lower(), password=cd['password1'])
            if user is not None and user.is_active:
                auth.login(request, user)
                return HttpResponseRedirect("/")
    else:
        
        form = RegistrationForm()
        user_profile_form = UserProfileForm() 
        
    return render(request,'registration/signup.html',
                            {'form': form,'user_profile_form':user_profile_form},)
    
def Home(request):
    if request.user.is_authenticated():
        return render(request,'home.html', {'user':True,'username': request.user})
    else:
       return render(request,'home.html',{'user':False,})


def Fitlogs(request):    
    if request.user.is_authenticated():
        user_profile = UserProfile.objects.get(id = request.user.id)
        workout_logs = FitLog.objects.filter(profile_id = user_profile.id)
        all_logs = {}
        for log in workout_logs:
            exercises = Exercise.objects.filter(fitlog_id = log.id)
            all_logs[log] = exercises
            
        return render(request,'fitlogs/userlogs.html',{ 'username':request.user,'logs':all_logs})
    else:
        return HttpResponseRedirect("/")
    
    
    
def ProcessData(request):
    user_profile = UserProfile.objects.get(id = request.user.id)
    workout_logs = FitLog.objects.filter(profile_id = user_profile.id).order_by('-log_date')
    all_logs = {}
    for log in workout_logs:
        exercises = Exercise.objects.filter(fitlog_id = log.id)
        all_logs[log] = exercises
        
    total = num = 1
    datelist = []
    selected_date = None
    for d in workout_logs:
        datelist.append(d.log_date)
        selected_date = d.log_date
        total +=  int(d.weight)
        num += 1
    aver = total / num
    
    
    return render(request,'fitlogs/progress.html',
                              {'username':request.user,'aver':aver,'dates':datelist, 'logs':all_logs,'selected_date':selected_date})
    



@login_required(login_url='/login/')
def FitLogHandler(request):    
    user_profile = UserProfile.objects.get(id = request.user.id)
    exercise_forms = formset_factory(ExerciseForm,extra=1)
    if request.method =='POST':
        fitform = FitlogForm(request.POST)    
        formset = exercise_forms(request.POST)
        
        if 'del_workout' in request.POST:
            formset,fitform = formset_handler(request,exercise_forms,-1)
        
        elif 'add_workout' in request.POST:
            formset,fitform = formset_handler(request,exercise_forms,1)
        
        elif 'submit' in request.POST:                        
            if fitform.is_valid() and formset.is_valid():
                submit_form(request,fitform,formset,user_profile)
                return HttpResponseRedirect("/fitlogs/")
    else:
        fitform = FitlogForm()
        formset = exercise_forms()
        
    return render(request,'fitlogs/logform.html',
                            {'username':request.user,'form':fitform,'formset':formset,'user_profile':user_profile},)

def submit_form(request,fitform,formset,user_profile):
    log = fitform.save(commit=False)
    log.profile_id = user_profile
    log.save()
    for values in formset.cleaned_data:
        exer = Exercise(workout= values['workout'],reps = values['reps'], 
                     duration = values['duration'], resistance=values['resistance'], fitlog_id = log)
        exer.save()
    
def formset_handler(request, exercise_forms,num):
    cp = request.POST.copy()
    cp['form-TOTAL_FORMS'] = int(cp['form-TOTAL_FORMS']) + num
    formset = exercise_forms(cp,prefix='form')
    fitform = FitlogForm(cp) 
    return formset,fitform

def Profile(request):
    user_profile = UserProfile.objects.get(id = request.user.id)
    
    if request.method =='POST':
        user_profile_form = UserProfileForm(request.POST)    
        if user_profile_form.is_valid():
            form = UserProfileForm(request.POST,instance=user_profile)
            form.save()
            user_profile.bmi_calc()
            
    else:
        user_profile_form = UserProfileForm(instance = user_profile)
        
    return render(request,'fitlogs/profile.html',
                            {'username':request.user,'user_profile_form':user_profile_form,'user_profile':user_profile},)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    