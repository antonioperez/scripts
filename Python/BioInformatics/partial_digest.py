

"""
Antonio Perez
ID: 106333168
Proj 2 CSCI 191 T

Steven Skiena's recursive brute solution for the partial digest problem.
This should yield all posssible sets of restrictions sites from a set of distances.
"""
class PartialDigest(object):
    def __init__(self, input):
        super(PartialDigest, self).__init__()
        self.file = open(input, 'r')
        self.output = open('output.txt', 'a')

    def calc_file(self):
        #calculate the partial digest on each line from file. 
        for l in self.file:
            nums = [int(n) for n in l.split(',')]
            self.output.write("\n \n \nNext List:\n")
            self.partial_digest(nums)

    def partial_digest(self, lis):
        self.width = max(lis)
        lis.remove(self.width)
        x = [0, self.width]
        self.place(lis, x)

    def place(self, lis, x):
        self.output.write("X = %s | L = %s \n" % (sorted(x), sorted(lis)))
        if not lis:
            #print sorted(x)
            self.output.write("X = %s \n" % sorted(x))
            return
        y = max(lis)
        if self.subset(self.delta(y, x), lis):
            x.append(y)
            self.remove_len(self.delta(y, x), lis)
            self.place(lis, x)
            x.remove(y)
            self.add_len(self.delta(y, x), lis)

        if self.subset(self.delta(self.width - y, x), lis):
            x.append(self.width - y)
            self.remove_len(self.delta(self.width - y, x), lis)
            self.place(lis, x)
            x.remove(self.width - y)
            self.add_len(self.delta(self.width-y, x), lis)
        return

    def delta(self, y, lis):
        # the multiset of distances between y and all points in a set X
        x = [abs(y-n) for n in lis]
        return x

    def remove_len(self, x, lis):
        #remove lengths in x from lis
        for i in x:
            if i in lis:
                lis.remove(i)
        return lis

    def add_len(self, lis1, lis2):
        # add the lengths in lis1 to lis2
        for i in lis1:
            if i in lis2:
                lis2.append(i)
        return lis2

    def subset(self, list1, list2):
        # check if list1 is a subset of list2
        x = True
        for i in list1:
            if i not in list2:
                x = False
        return x

PDP = PartialDigest('distance.txt')
PDP.calc_file()
