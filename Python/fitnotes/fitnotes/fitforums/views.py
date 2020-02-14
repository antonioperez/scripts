from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib import auth
from django.http import HttpResponseRedirect

from fitnotes.fitlogs.models import *
from fitnotes.fitlogs.forms import *
from django.contrib.auth.models import User




def FitForum(request):
	if request.user.is_authenticated():
		return render_to_response('fitforums.html',
								{'user':True,'username':request.user})
	else:
	   return render_to_response('fitforums.html')


	