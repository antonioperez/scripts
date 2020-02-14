import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class Email(object):
	"""Python 2.7.6"""
	def __init__(self, to_addr):
		self.to_addr = to_addr
		self.from_addr = "aperez2541@gmail.com"
		self.login    = "aperez2541@gmail.com"
		self.password = ""

	def email(self, path):
		msg = MIMEMultipart('alternative')
		subject  = "Test"
		msg['Subject'] = subject
		msg['To'] = self.to_addr
		msg['From'] = self.from_addr

		content = open(path, 'rb').read()
		html = MIMEText(content, 'html')
		msg.attach(html)
		self.send(msg)

	def send(self, msg):
		server = smtplib.SMTP('smtp.gmail.com', 587)
		server.ehlo()
		server.starttls()
		server.login(self.login, self.password)
		server.sendmail(self.from_addr, self.to_addr, msg.as_string())
		server.quit()


#TOADDRS = raw_input("To: ").strip()
email_handler = Email('aperez2541@gmail.com')
email_handler.email("email.html")




