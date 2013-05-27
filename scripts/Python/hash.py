import hashlib

salt = 'antonioperez'
def hash(word):
	return hashlib.sha256(word+salt).hexdigest()

def main():
	word = raw_input('Enter a password: ')
	print hash(word)


if __name__ == '__main__':
	main()

