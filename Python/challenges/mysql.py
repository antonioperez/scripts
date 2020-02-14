
date_range= """SELECT log_date,weight FROM fitlogs_fitlog 
where fitlogs_fitlog.profile_id_id = 1 
and log_date > '2012-08-17' and log_date <'2012-08-21' """

sum_weight = """SELECT auth_user.username,SUM(weight) FROM auth_user,fitlogs_fitlog 
where auth_user.id= fitlogs_fitlog.profile_id_id  and fitlogs_fitlog.profile_id_id  = 3"""

count_all = """SELECT auth_user.username,COUNT(log_date) FROM auth_user,fitlogs_fitlog 
where auth_user.id= fitlogs_fitlog.profile_id_id  and fitlogs_fitlog.profile_id_id  = 1"""

count = '''SELECT auth_user.username,COUNT(log_date),type FROM auth_user,fitlogs_fitlog 
where auth_user.id= fitlogs_fitlog.profile_id_id  and fitlogs_fitlog.profile_id_id  = 1
group by type'''

import MySQLdb
import sys

connection = MySQLdb.connect (host = "local", user = "aperez", passwd = "reaper1", db = "fitnotes")

cursor = connection.cursor ()

cursor.execute (date_range)
data = cursor.fetchall ()

for row in data :
	print row

cursor.close ()
connection.close ()

sys.exit()