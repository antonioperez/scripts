"""
Antonio Perez ID: 106333168



SmithWaterman local alignment dynamic algorithm with linear gap scoring scheme, implemented in python
.

To simply run the program through the terminal, Python 2.6.6 or higher must be installed. 
Change to file directory
The Command:  ">python file.py" will run the program. 

"""


class SmithWaterman(object):
    """docstring for SmithWaterman"""
    def __init__(self, geno_fname, anno_file):
        super(SmithWaterman, self).__init__()
        # open up files in the name directory/ create new one
        self.gene_file = open(geno_fname, 'r')
        self.anno_file = open(anno_file, 'r')
        #self.extracted = open('extracted.fa', 'w')

    def main(self):
        # get file text then transverse through each line
        genes = self.gene_file.read()
        for line in self.anno_file:
            pattern_id = line
            pattern_seq = self.anno_file.next()
            print line
            self.smith_water(genes, pattern_seq)

    def smith_water(self, ref_str, pattern):
        vtable = []
        optimumScore = optimum_index_i = optimum_index_j= 0
        for i in xrange(0, len(pattern)):
            vtable.append([])
            vtable[i].append(0)

        for j in xrange(1, len(ref_str)):
            for i in xrange(0,len(pattern)):
                if i == 0:
                    vtable[i].append(0)
                else:
                    maxval = self.max_value(vtable,i,i-1,2,i-1)
                    vtable[i].append(6)

                if vtable[i][1] >= optimumScore:
                    optimumScore = vtable[i][1];
                    optimum_index_i = i
                    optimum_index_j = j
            
   
            for k in xrange(0, len(pattern)):
                vtable[k][0] = vtable[k][1]
        print "----optimumScore: %s , Pattern(%s,%s)" % (optimumScore, optimum_index_i, optimum_index_j)

    def max_value(self, vtable ,pos, left, upper, diagonal):
        maxV = vtable[pos][0]
        if vtable[left][0] > maxV:
            maxV = vtable[left][0]
        if vtable[upper][0] > maxV:
            maxV = vtable[upper][0]
        if vtable[diagonal][0] > maxV:
            maxV = vtable[diagonal][0]
        return maxV

SW = SmithWaterman('chr1.fa','NM_032291-10exon-seqs.fa')
SW.main()

""""Sample Run
>>chr1.66999824.67000051.NM_032291_exon_0_0_chr1_66999825_f.+
processing took too long for meaningful answer. 





""""


