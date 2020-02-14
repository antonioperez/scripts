"""
Antonio Perez
CSCI 191T
Prog6


To simply run the program through the terminal, Python 2.6.6 or higher must be installed. 
Change to file directory
The Command:  ">python file.py" will run the program. 
"""
from collections import defaultdict

class GeneMap(object):
	"""docstring for GeneMap"""
	def __init__(self, annofile, readfiles = []):
		super(GeneMap, self).__init__()
		self.annofile = open(annofile, 'r').readlines()
		self.readfiles = [open(f, 'r') for f in readfiles]
		self.output = open('output.txt', 'a')
		self.maps = defaultdict(list)
		#using a dictionary of lists to keep track of all read file counts of a certain geneID

	def map(self):
		percentages = {}
		write_id = True
		for f in self.readfiles:
			map = self.scan_bowtie(f)
			read_percent = self.compute_percent(map)
			self.collect_map(read_percent)
		self.pack_out()

	def compute_percent(self, data):
		percentages = {}
		for anno in self.annofile:
			info = anno.split()
			geneID = "%s[%s:%s]" % (info[3], info[1], info[2])
			total_tiles = (float(data[geneID]) / (int(info[2]) - int(info[1])))
			percentages[geneID] = total_tiles

		print percentages
		return percentages

	def collect_map(self, data):
		for id, value in data.iteritems():
			self.maps[id].append(value)

	def pack_out(self):
		self.output.write("GeneID                         >ReadLen50 >ReadLen75 >ReadLen100")
		for id, value in self.maps.iteritems():
			self.output.write("\n%s  " % id)
			for i in value:
				self.output.write(">{0:.2f} ".format(i))
		return True

	def scan_bowtie(self, data):
		map = {}
		for l in data:
			colbed6 = l.split('.')
			geneID =  "%s[%s:%s]" % (colbed6[3], colbed6[1], colbed6[2])
			if geneID in map:
				map[geneID] += 1
			else:
				map[geneID] = 1
			data.next()
		return map

genemap = GeneMap('HG19-RS-annot-250', ['reads50.fa', 'reads70.fa', 'reads100.fa'])
map = genemap.map()
print genemap.maps
























