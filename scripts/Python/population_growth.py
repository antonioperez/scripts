

sim_len =  10
pop = 100
growth_rate = .1
step = .005
num_iter =  sim_len/step

for x in xrange(1,sim_len):
	growth = growth_rate*pop
	old_pop = pop
	pop = old_pop + growth * step
	t = x * step
	print t,":",pop,"=",old_pop,"+", growth