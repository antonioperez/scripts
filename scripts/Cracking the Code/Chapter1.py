
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



sb = StringBuffer()
print sb.uniqueChar("Implement an algorithm to determine")
print sb.isPerm("test", "ewtt")
print sb.isPerm("test", "estt")
print sb.replace("Mr John Smith", " ", "%20")
print sb.pyReplace("Mr John Smith", " ", "%20")
