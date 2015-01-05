//Implement a function void reverse(char* str) 
//in C or C++ which reverses a null- terminated string.

#include <stdio.h>


void reverse(char* str){
	int index = 0;
	int index1 = 0;
	while (str[index] != '\0'){
		index += 1;
	}
	char temp[index];
	for (int i = index - 1; i >= 0; --i){
		temp[index1] = str[i];
		index1++;
	}
	printf("%s\n", temp );
}

int main(){
	char *word = "Hello";
	reverse(word);
	//printf("%s\n", word );
	return 0;
}