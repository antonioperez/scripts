// Given a sorted array in non-decreasing order, 
// return an array of squares of each number, 
// also in non-decreasing order. 
// For example: [-4,-2,-1,0,3,5] -> [0,1,4,9,16,25]
// How can you do it in O(n) time?


function squareArray(numbers){
  result = [];
  endIndex = numbers.length - 1;
  resultIndex = endIndex;
  startIndex = 0;

  while(startIndex <= endIndex){
    const startNum = Math.abs(numbers[startIndex])
    const endNum = Math.abs(numbers[endIndex]);
    if(startNum > endNum){
      result[resultIndex] = startNum * startNum;
      startIndex++;
    } else {
      result[resultIndex] = endNum * endNum;
      endIndex--;
    }
    resultIndex--;
  }
  return result;
}

console.log(squareArray([-4,-2,-1,0,3,5]))