#Antonio Perez
#Project euler 2/10/13
#sum squar difference
sum_squares = 0
square_sum = 0
for i in xrange(0,101):
	sum_squares += pow(i,2)
	square_sum += i
print pow(square_sum,2) - sum_squares 
