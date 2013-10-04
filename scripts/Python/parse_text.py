

#Get file directory
file_path = str(raw_input('Enter path to movie file\n')).strip()

#open file and get text
movie_text = open(file_path,'r')

#movie ratings to look for in Python list (array)
ratings = ['PG-13','NR','PG','G','R']

#variable where we will store in a python dictionary 
parsed_data = {}

#go through each line
for line in movie_text:
	#if we found the quote in the line, that means movie information is there
	if '"' in line:
		# go through each word in that line and find if any word matches any valid movie rating
		# the .split() function removes all spaces
		for word in line.split():
			if word in ratings: # if any word in the line matches a rating, save it to a variable
				movie_rating = word

		# find the position of the first quote in the line of text and the second
		first_quote = line.find('"')+1
		last_quote = line.find('"',first_quote+1)

		#copy the substring between the position of the two quotes
		movie_title = line[first_quote:last_quote]

		#save to the dictionary
		parsed_data[movie_title] = movie_rating



#print
print  "Movie : Rating" 
for title,rating in parsed_data.items():
	print title + " : " + rating




#close file
movie_text.close()