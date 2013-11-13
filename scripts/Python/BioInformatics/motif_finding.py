


"""
Antonio Perez
ID: 106333168
Proj 3 CSCI 191 T

The branch and bound algorithms of the Motif Finding Problem and Median String Problem in Python. 

To simply run the program through the terminal, Python 2.6.6 or higher must be installed. 
The Command:  ">python file.py" will run the program. 
"""
from math import log

class MotifMedianFinding(object):

    def __init__(self, input_file):
        super(MotifMedianFinding, self).__init__()
        self.input_lines = open(input_file, 'r')

    def output(self):
        #main method to call both functions
        sequences = {}
        for line in self.input_lines:
            if '>' in line:
                sequences[line] = self.input_lines.next()

        for label, seq in sequences.iteritems():
            print "DNA:" + seq + "\n\n\n\n\n"
            median = self.median_string(seq, 5,5, len(seq))
            self.motif(seq, median,5,len(seq))
        
    def median_string(self, dna, t, n, l):
        #bound and search method of calulating median string
        start_pos = start_pos = [1,1,1,1,1]
        best_dist = 1000000000
        i = 1
        while i > 0:
            if i < l:
                prefix = str(start_pos)
                opt_dist = self.hamming_score(prefix, dna)
                if opt_dist > best_dist:
                    s,i = self.bypass(start_pos,i,l,4)
                else:
                    s,i = self.next_vertex(start_pos,i,l,4)
            else:
                word = str(s)
                if self.hamming_score(word, dna) < best_dist:
                    best_dist = self.hamming_score(word, dna)
                    bestword = word
                s,i = self.next_vertex(start_pos,i,l,4)
        print "Best Word: %s (tot_dis = %s)" % (bestword,best_dist)
        return bestword


    def motif(self, dna, t, n, l):
        #bound and search method of calculating motif
        start_pos = [1,1,1,1,1]
        best_score = 0
        i = 1
        while 1 > 0:
            if i < t:
                opt_score = Score(s, i, dna) + (t-1) * l
                if opt_score < best_score:
                    start_pos, i = self.bypass(start_pos, i, t, n-l+1)
                else:
                    start_pos, i = self.next_vertex(start_pos, i, t, n-l+1)
            else:
                if self.score(start_pos, dna) > best_score:
                    best_score = self.score(start_pos)
                    best_motif = str(s)
                start_pos, i = self.next_vertex(start_pos, i, t, n-l+1)
        print "motif consensus string: %s (consensus_score = %s) " % (best_motif, best_score)
        print "motif positions/string s=(s1..st): %s" % ', '.join(start_pos)
        return best_motif

    def bypass(vertex, level, l, k):
        #skip uncessary calculations in the tree
        j = level
        for ind in xrange(j,1,-1):
            if a[j] < k:
                a[j] = a[j] + 1
                return vertex, j
        return vertex, 0 

    def next_vertex(self, vertex, level, L, k):
        #transverse the tree of a strand of genes
        if level < L:
            vertex[level+1] = 1
            return vertex,level+1
        else:
            j = L
            for ind in xrange(j,1,-1):
                if vertex[ind] < k:
                    vertex[j]  = vertex[j] + 1
                    return vertex, j
        return vertex, 0

    def score(start_pos):
        # biggest score of motif
        total = 0
        for i in start_pos:
            total += i
        return total

    def hamming_score(self, s, dna):
        pass


            




motif_median = MotifMedianFinding('HMP-part.fa')
motif_median.output()
