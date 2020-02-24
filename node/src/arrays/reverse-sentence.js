// Given a sentence, reverse the words of the sentence
test1 = ["h","e","l","l","o"];
test2 = ["h","a","n","n","a","H"];
test3 = ["H","a","n","n","a","h"];

function reverseString(sentence){
  if(!sentence || sentence.length === 0){
    return sentence;
  }

  let lastIndex = sentence.length - 1;
  for (let index = 0; index < sentence.length; index++) {
    if(lastIndex < index) {
      break;
    }

    const temp = sentence[lastIndex];
    sentence[lastIndex] = sentence[index];
    sentence[index] = temp;
    lastIndex--;
  }

  return sentence;
}

console.log(reverseString(test1));
console.log(reverseString(test2));
console.log(reverseString(test3));