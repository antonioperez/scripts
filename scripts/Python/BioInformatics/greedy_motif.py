


"""
Antonio Perez
ID: 106333168
Proj 3 CSCI 191 T

The  GreedyMotif algorithm of the Motif Finding Problem in Python. 

To simply run the program through the terminal, Python 2.6.6 or higher must be installed. 
The Command:  ">python file.py" will run the program. 
"""

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
            print "DNA:" + seq + "\n"
            print self.GreedyMotif(seq, 7,5,len(seq))
        
    def Score(self, s, i, DNA):
        # biggest score of motif
        total = 0
        col = row = 0
        for mot_range in xrange(0, 8):
            count = {'A':0, 'T':0, 'G':0, 'C':0}
            for ith in xrange(0,i):
                if (DNA[row][s[row]-1].upper()) in count:
                    count[DNA[row][s[row]-1].upper()] += 1
                s[row] += 1
                row += 1
            row = 0
            total += max(count.values())

        return total

    def GreedyMotif(self, DNA, t, n, l):
        best_motif = [1 for i in xrange(1,l)]
        s = [1 for i in xrange(1,l)]
        print self.Score(s,2,DNA) 
        for s1 in xrange(1,n-l+1):
            for s2 in xrange(1,n-l+1):
                if self.Score(s,2,DNA) > self.Score(best_motif,2,DNA):
                    best_motif1 = s1
                    best_motif2 = s2
        s1 = best_motif1
        s2 = best_motif2
        for i in xrange(3,t):
            for si in xrange(1, n-l+1):
                if self.Score(s, i, DNA) > self.Score(best_motif, i, DNA):
                    best_motif[i] = s[i]

            s[i]= best_motif[i]
        return best_motif



motif_median = MotifMedianFinding('HMP-part.fa')
motif_median.output()
print motif_median.Score(s,DNA,2)
























