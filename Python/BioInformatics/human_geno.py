"""
Antonio Perez 
ID: 106333168
CSCI 191t

"""


class Geno(object):
    """Geno class to extract specific genos """
    def __init__(self, geno_fname, anno_file):
        super(Geno, self).__init__()
        # open up files in the name directory/ create new one
        self.gene_file = open(genes_fname, 'r')
        self.anno_file = open(anno_fname, "r")
        self.extracted = open('extracted.fa', 'w')

    def extract_geno(self):
        ref_id = 

    def rev_comp(self, gene_seq):
        rev_def = {"T": "A", "A": "T", "C": "G", "G": "C",
                        "t": "a", "a": "t", "c": "g", "g": "c"}
        rev_gene = ""
        for gene in gene_seq:
            #for each gene in seq, complement it
            if gene in rev_def:
                rev_gene += rev_def[gene]
        #reverse string
        rev_gene = rev_gene[::-1]
        return rev_gene

    def kill_fstreams(self):
        # kill file streams
        self.extracted.close()
        self.gene_file.close()
        self.anno_file.close()

genes_fname = "chr1.fa"
anno_fname = "output1"

genos = Geno(genes_fname, anno_fname)
genos.extract_geno()
genos.kill_fstreams()
