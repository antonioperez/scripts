def AndGate(a,b):
	if a == b and a != 0:
		return 1
	else:
		return 0

def ORGate(a,b):
	if a == 1 or b == 1:
		return 1
	else:
		return 0

def NotGate(a):
	if a == 1:
		return 0
	else:
		return 1

def XORGate(a,b):
	if a==b:
		return 0 
	else:
		return 1

def ADDER(a,b,cin):
	cout = ORGate(AndGate(a,b),AndGate(cin,XORGate(a,b)))
	return XORGate(XORGate(a,b),cin), cout

def MUX2x1(a,inv):
	if inv == 0:
		return a
	else:
		return NotGate(a)

def MUX4x1(and_,or_,sum_, slt, op):
	if op[2] == 0:
		if op[3]==0:
			return and_
		else:
			return or_
	else:
		if op[3]==0:
			return sum_
		else:
			return slt

"""op is a list. The first two values op[0] and op[1] are for the 2x1 mux that
 invert a and b respectively"""
def ALU1bit(op,a,b,cin):
	cout = slt = 0
	amux = MUX2x1(a,op[0])
	bmux = MUX2x1(b,op[1])
	and_ = AndGate(amux,bmux)
	or_ = ORGate(amux,bmux)
	adder,cout = ADDER(amux,bmux,cin)
	cin = cout
	return MUX4x1(and_,or_,adder,slt,op),cin

def ALU32bit(op,a,b,zero):
	cin = op[1] 
	result = []
	rout = ""
	for i in xrange(31,-1,-1):
		re,cin = ALU1bit(op,int(a[i]),int(b[i]),cin)
		result.append(re)
		if i ==0:
			overflow = XORGate(cout,cin)
			amux = MUX2x1(int(a[0]),op[0])
			bmux = MUX2x1(int(b[0]),op[1])
			adder,cout = ADDER(amux,bmux,cin)
			if op[1] == 1 and op[2] == 1 and op[3] == 1 and adder != 0:
				result[0] = 1
				result[31] = 0
		cout = cin
	for i in reversed(result): rout += str(i)
	return rout,overflow
 
def bits(n):
	mask = 1
	mask <<=31
	result = ""
	for i in xrange(0,32):
		if (n & mask) == 0:
			num = 0
		else:
			num = 1
		result += str(num) 
		n <<=1

	return result

a = bits(int(raw_input('Enter a number: ')))
b = bits(int(raw_input('Enter b number: ')))
zero = 0
print 'a = %s\nb = %s' % (a,b)
print '\nAND: \n   Result: %s \n   Overflow: %d' % ALU32bit([0,0,0,0],a,b,zero)
print '\nOR:  \n   Result: %s \n   Overflow: %d' % ALU32bit([0,0,0,1],a,b,zero)
print '\nADD: \n   Result: %s \n   Overflow: %d' % ALU32bit([0,0,1,0],a,b,zero)
print '\nSUB: \n   Result: %s \n   Overflow: %d' % ALU32bit([0,1,1,0],a,b,zero)
print '\nSLT: \n   Result: %s \n   Overflow: %d' % ALU32bit([0,1,1,1],a,b,zero)
print '\nNOR: \n   Result: %s \n   Overflow: %d' % ALU32bit([1,1,0,0],a,b,zero)
print zero