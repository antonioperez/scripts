
// print all combinations of length x

function printCombos(numbers, comboLength) {
  const buffer = new Array(comboLength);
  printCombosHelper(numbers, 0, buffer, 0)
}

function printCombosHelper(numbers, startIndex, buffer, bufferIndex) {
  //console.log(buffer.slice(0, bufferIndex));
  if (buffer.length === bufferIndex) {
    //combos of length
    console.log(buffer);
    return;
  }

  if(startIndex === numbers.length) {
    return;
  }

  for (let index = startIndex; index < numbers.length; index++) {
    buffer[bufferIndex] = numbers[index];
    printCombosHelper(numbers, index + 1, buffer, bufferIndex + 1);
  }
}

printCombos('123', 5)

//print permutations
function printPermutations(numbers, permLength){
  const buffer = new Array(permLength);
  const isInBuffer = new Array(permLength);
  printPermutationHelper(numbers, buffer, 0, isInBuffer);
}

function printPermutationHelper(numbers, buffer, bufferIndex, isInBuffer){
  console.log('value', buffer);
  if(buffer.length === bufferIndex){
    console.log('value', buffer);
    return;
  }

  for (let index = 0; index < numbers.length; index++) {
    if(!isInBuffer[index]){
      buffer[bufferIndex] = numbers[index];
      isInBuffer[index] = true;
      printPermutationHelper(numbers, buffer, bufferIndex+1, isInBuffer);
      isInBuffer[index] = false;
    }
  }
}

//printPermutations([1,3,5], 5);


function getSubstringCombinations(inputString, length) {
  const results = [];
  const buffer = new Array(length);
  getCombinationHelper(inputString, 0, buffer, 0, results);
  return results;
}

function getCombinationHelper(inputString, startIndex, buffer, bufferIndex, results) {
  //if (buffer.length === bufferIndex) {
      results.push(buffer);
  //}
  
  if(startIndex === inputString.length) {
      return;
  }
  
  for (let index = startIndex; index < inputString.length; index++) {
      buffer[bufferIndex] = inputString[index];
      getCombinationHelper(inputString, index + 1, buffer, bufferIndex + 1, results);
  }
}