
#A guessing game for /r/dailyprogrammer
#
#1/9/2012
#Antonio Perez
#
import random
def numbergame(guess,rand_num,correct = False):
	while correct is not True:
		guess = raw_input()
		if guess == 'exit':
			print 'Thanks for playing!'
		if guess.isdigit():
			if int(guess) == number:
				print 'Correct!'
				return numbergame(guess,rand_num,True)
			elif int(guess) < number:
				print 'Wrong! That number is below my number'
				return numbergame(guess,rand_num)
			elif int(guess) > number:
				print 'Wrong! That number is above my number'
				return numbergame(guess,rand_num)
		else:
			print 'Enter a valid value'

print 'Welcome to the guessing game, I have a number between 0 - 100. Guess it! \nType exit to terminate\n'
number = random.randint(0,100)
numbergame('',number)


