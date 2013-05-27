"""2520 is the smallest number that can be divided by each of the numbers from 
1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of 
the numbers from 1 to 20?"""

def is_div(x):
	if x == 0:
		return True
	else:
		return False

num = 300000000
for i in xrange(num,200000000,-1):
		if all([is_div(i % div) for div in xrange(1,21)]):
			print i

