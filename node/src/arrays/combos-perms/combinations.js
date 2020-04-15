
// print all combinations of length x

function printCombos(numbers, comboLength) {
  const buffer = new Array(comboLength);
  printCombosHelper(numbers, 0, buffer, 0)
}

function printCombosHelper(numbers, startIndex, buffer, bufferIndex) {
  //subsets
  //console.log(buffer.slice(0, bufferIndex));
  if (buffer.length === bufferIndex) {
    //combos of length
    //console.log(buffer);
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

printCombos([1,2,3], 2)

//print permutations
function printPermutations(numbers, permLength){
  const buffer = new Array(permLength);
  const isInBuffer = new Array(permLength);
  printPermutationHelper(numbers, buffer, 0, isInBuffer);
}

function printPermutationHelper(numbers, buffer, bufferIndex, isInBuffer){
  if(buffer.length === bufferIndex){
    console.log('value', buffer);
    return;
  }

  for (let index = 0; index < numbers.length; index++) {
    if(!isInBuffer[index]){
      buffer[bufferIndex] = numbers[index];
      isInBuffer[index] = true;
      console.log(numbers, buffer, bufferIndex+1, isInBuffer);
      printPermutationHelper(numbers, buffer, bufferIndex+1, isInBuffer);
      isInBuffer[index] = false;
    }
  }
}

printPermutations([1,2,3], 2)