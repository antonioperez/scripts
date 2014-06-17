from Queue import Queue 
import random
import threading
import time




maxSize = 10
pool_sema = threading.BoundedSemaphore(value=maxSize)

class Producer(threading.Thread):
	buffer = None
	def __init__(self,thread_name, buffers,start_val, end_val):
		self.buffers = buffers
		self.start_val = start_val
		self.end_val = end_val
		threading.Thread.__init__(self, name = thread_name)

	def sizeQueue(self):
		print "\nSize Queue %s read from Producer: %s\n" % (self.buffers.index(self.buffer),self.buffer.qsize())

	def BufferSizes(self):
		sizes = []
		for buff in self.buffers:
			sizes.append(buff.qsize())

		print sizes
	def run(self):
		for i in range(self.start_val,self.end_val):
			self.buffer = random.choice(self.buffers)
			val = random.randrange(1, 100)
			qs = threading.Timer(3,self.BufferSizes).start()
			time.sleep(random.randrange(10))
			print "%s adding %s to queue %s" % (self.getName(),val, self.buffers.index(self.buffer))
			pool_sema.acquire()
			self.buffer.put(val)
			pool_sema.release()
		print self.getName(),"Finished Producing"
		print "shutting down", self.getName()

class Consumer(threading.Thread):
	buffer = None
	def __init__(self, thread_name, buffers, start_val, end_val):
		self.buffers = buffers
		self.start_val = start_val
		self.end_val = end_val
		threading.Thread.__init__(self, name = thread_name)

	def sizeQueue(self):
		print "\nSize Queue %s read from Consumer: %s\n" %(self.buffers.index(self.buffer),self.buffer.qsize())
		
	def run(self):  
		sum = 0
		current = self.start_val
		for i in range(self.end_val):
			self.buffer = random.choice(self.buffers)
			time.sleep(random.randrange(10))
			qs = threading.Timer(1,self.sizeQueue).start()
			pool_sema.acquire()
			try:
				current = self.buffer.get(timeout = 3)
			except:
				current = 0
			pool_sema.release()
			print "%s consuming %s from queue %s" % (self.getName(),current,self.buffers.index(self.buffer))
			sum += current
		print "%s comsumed values totaling: %d" %(self.getName(),sum)
		print "shutting down", self.getName()

buffers = []
for i in xrange(10):
	queue = Queue(maxsize=10)
	buffers.append(queue)

producer = Producer("Producer", buffers,0,20)
consumer = Consumer("Consumer", buffers,0,40)
producer.start()
consumer.start()

producer.join()
consumer.join()

print "Finished in: %s" % elapsed
		