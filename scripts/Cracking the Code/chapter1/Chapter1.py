
class StringBuffer(object):
	"""Chapter 1 of cracking the coding interview"""
	def __init__(self, arg = None):
		super(StringBuffer, self).__init__()
		self.arg = arg

	def uniqueChar(self, string):
		"""1.1 
		Implement an algorithm to determine if a string has all unique characters. 
		What if you cannot use additional data structures?"""
		unique = True
		chars_hits = {}
		for char in string:
			if chars_hits.get(char,None):
				unique = False
				break
			else:
				chars_hits[char] = 1
		return unique

	def isPerm(self, s1, s2):
		""" 1.2 Given two strings, write a method to decide 
		if one is a permutation of the other."""
		if len(s1) != len(s2):
			return False
		return sorted(s1) == sorted(s2)
	def replace(self, string, target, replacement):
		"""
		1.4 Write a method to replace all spaces in a string with'%20'. 
		You may assume that the string has sufficient space at the end of the string 
		to hold the additional characters, and that you are given the "true" length of 
		the string. 
		EXAMPLE
		Input: "Mr John Smith Output: "Mr%20Dohn%20Smith
		"""
		new_string = ""
		if string:
			for char in string:
				if char == target:
					new_string += replacement
				else:
					new_string += char
		return new_string

	def pyReplace(self, string, target, replacement):
		new_string = list(string)
		for i in range(0,len(string)):
			if new_string[i] == target:
				new_string[i] = replacement
		return "".join(new_string)

	def compress(self, string):
		"""	
		1.5 Implement a method to perform basic string compression using the counts of repeated characters. 
		For example, the string aabcccccaaa would become a2blc5a3. If the "compressed" string would not become 
		smaller than the orig- inal string, your method should return the original string.
		"""
		copy = []
		last = ""
		count = 0
		length = len(string)
		for index in range(0, length):
			if string[index] != last and count:
				copy.append(last)
				copy.append(str(count))
				count = 0
			last = string[index]
			count += 1
		copy.append(string[length-1])
		copy.append(str(count))
		return "".join(copy)

	def rotateImg(self):
		"""1.6Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, 
			write a method to rotate the image by 90 degrees. Can you do this in place?"""

	def CheckMatrix(self, matrix):
		"""1.7 Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.
		"""
		cols = []
		rows = []
		row = col = 0
		for r in matrix:
			for num in r:
				if num == 0:
					rows.append(row)
					cols.append(col)
					row = 0
				col += 1
			col = 0
			row += 1

		for row in rows:
			for i in range(0, len(matrix[row])):
				matrix[row][i] = 0
				
		for col in cols:
			for i in range(0, len(matrix)):
				matrix[i][col] = 0
		return matrix

	def isSubstring(self, word1, word2):
		"""1.8 Assume you have a method isSubstring which checks if one word is a substring of another. 
		Given two strings, s i and s2, write code to check if s2 is a rotation of si using only one call 
		to isSubstring (e.g.,"waterbottle"is a rotation of"erbottlewat")."""
		if len(word1) != len(word2):
			return False
		check = word1+word1
		if word2 in check:
			return True
		return False




sb = StringBuffer()
print sb.uniqueChar("Implement an algorithm to determine")
print sb.isPerm("test", "ewtt")
print sb.isPerm("test", "estt")
print sb.replace("Mr John Smith", " ", "%20")
print sb.pyReplace("Mr John Smith", " ", "%20")
print sb.compress("aabcccccaaa")
print sb.CheckMatrix([[0, 5, 1, 4, 5],
					  [3, 7, 2, 9, 40], 
					  [1, 2, 1, 4, 0],])
print sb.isSubstring("waterbottle", "erbottlewat")
