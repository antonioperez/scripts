from django.conf.urls import *
from django.contrib import admin

from fitnotes.fitforums.views import *
from fitnotes.fitlogs.views import *

from django.contrib.auth.views import login, logout



admin.autodiscover()

urlpatterns = patterns('',

	(r'^admin/', include(admin.site.urls)),
	(r'^$',Home),
	(r'^fitlogs/$',Fitlogs),
	(r'^fitlogs/logit$',FitLogHandler),
	(r'^fitlogs/progress$',ProcessData),
	(r'^fitlogs/profile',Profile),
	
	(r'^fitforums/$',FitForum),
	
	
	(r'^login/$',  login, {'extra_context': {'next': '/'}}),
	(r'^logout/$', logout,{'next_page': '/'}),
	
	(r'^signup/$', RegisterUser),
	
)
              