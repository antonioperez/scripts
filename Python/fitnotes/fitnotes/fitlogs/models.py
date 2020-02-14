from django.db import models
from django.contrib.auth.models import User
   
# Create your models here.

        
class UserProfile(models.Model):
    #requried for association to User
    user = models.OneToOneField(User)
    curr_weight = models.IntegerField(max_length = 4,)
    feet = models.IntegerField(max_length = 4,)
    inches = models.IntegerField(max_length = 4,)
    bmi = models.FloatField(max_length = 30,)
    last_mod = models.DateField(auto_now=True)

    def bmi_calc(self):
        self.bmi = round((self.curr_weight * 703.0) / pow(((self.feet * 12.0) + self.inches),2),2)
        

    
class FitLog(models.Model):
    log_date=models.DateField()
    created = models.DateField(auto_now=True)
    type = models.CharField(max_length = 30,)
    profile_id = models.ForeignKey(UserProfile,blank = True)
    weight = models.CharField(max_length=60,)

    def __unicode__(self):
        return u'%s' % self.log_date
        
    class Meta:
        ordering =['-log_date']
        
class Exercise(models.Model):
    workout=models.CharField(max_length=80)
    duration=models.CharField(max_length=20)
    reps=models.CharField(max_length=20)
    resistance=models.CharField(max_length=40)
    fitlog_id = models.ForeignKey(FitLog,blank = True)

    
    def __unicode__(self):
        return self.workout


	
