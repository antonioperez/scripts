/*
Word Break Problem: Given a String S, which contains letters and no spaces, 
find if it can be broken it into valid words. Return one such combination of words. 
Assume you are provided a dictionary of English words.

ex) 

S = "ilikemangotango"

"i like mango tango"
"i like man go tan go"
"i like mango tan go"
"i like man go tango"
*/

function breakWords(dictionary,sentence) {
  if(!sentence || sentence.length < 0) {
    return sentence;
  }

  const previousWords = new Array(sentence.length).fill(0);
  const result = [];
  if(findWords(dictionary, sentence, 0, result, previousWords)){
    return results;
  }

  return null;
}

function wordBreak(dictionary, sentence, startIndex, results, previousWords) {

  if(startIndex === sentence.length) {
    return true;
  }

  if(!previousWords[start] === false) {
    return false;
  }

  for (let index = startIndex; index < sentence.length; index++) {
    const word = sentence[index].substring(startIndex, index + 1);
    if(dictionary[word]) {
      result.push(word);
      if(wordBreak(dictionary, sentence, i + 1, result, previousWords)){
        return true;
      } else {
        result.pop();
        previousWords[i + 1] = false;
      }
    }
  }
}