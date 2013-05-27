"""Write A function that takes an amount of money, rounds it 
to the nearest penny and then tells you the minimum number of 
coins needed to equal that amount of money. 
For Example: "4.17" would print out:
Quarters: 16
Dimes: 1
Nickels: 1
Pennies: 2
"""

def Coins(amount):
	quarters = dimes = nickels = pennies = 0 
	coins = [.25,.10,.05,.01]
	if amount == 0:
		return quarters,dimes,nickels,pennies
	for value in coins:
		while (amount - value) > -0.01:
			if value == .25 :
				quarters += 1
			elif value == .10:
				dimes += 1
			elif value == .05:
				nickels += 1
			elif value == .01:
				pennies += 1
			amount -= value
			
	return quarters,dimes,nickels,pennies

#print "Quarters: %s \nDimes: %s \nNickels: %s \nPennies: %s " % Coins(4.17)




listc = [3,4,5,6,7,8,8,9]

for y in listc:
	print y

for x in xrange(0,4):
	print listc[x]

