import random, string, itertools, time

password = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(5))
print password,  "\n\n\n\n"

def bruteforce(charset, maxlength):
    return (''.join(candidate)
        for candidate in itertools.chain.from_iterable(itertools.product(charset, repeat=i)
        for i in range(1, maxlength + 1)))

count = 0
start_time = time.time()
for attempt in bruteforce(string.ascii_uppercase + string.digits, 5):
	if count % 100000 == 0:
		print count
		print "--- %s seconds ---" % (time.time() - start_time)
	if attempt == password:
		print attempt
		break
	count += 1