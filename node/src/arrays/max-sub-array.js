// Given an array of integers that can be both +ve and -ve, 
// find the contiguous subarray with the largest sum

function findMaxSubarray(array) {
  if(!array || array.length < 0) {
    return null
  }

  let currentMax = array[0];
  let tempMax = array[0];
  for (let index = 1; index < array.length; index++) {
    tempMax = Math.max(array[index], tempMax + array[index]);
    currentMax = Math.max(currentMax, tempMax);
  }

  return currentMax;
}

function findMaxSubarrayIndexes(array){
  if(!array || array.length < 0) {
    return null
  }

  let startMaxIndex = 0; 
  let endMaxIndex = 0;
  let tempStartIndex = 0;
  let currentMax = array[startMaxIndex];
  let runningMax = array[startMaxIndex];

  for (let index = 1; index < array.length; index++) {
    runningMax += array[index];
    if (runningMax < 0){
      runningMax = 0;
      tempStartIndex = index+1;
    }

    if(currentMax < runningMax) {
      currentMax = runningMax;
      startMaxIndex = tempStartIndex;
      endMaxIndex = index;
    }
  }

  return [startMaxIndex, endMaxIndex];
}

let test1 = [1,2,-1,2,-3,2,-5];
console.log(findMaxSubarray(test1), findMaxSubarrayIndexes(test1));

test1 = [-2,-3,4,-1,-2,1,5,-1];
test1 = [1, -2, 1, 1, -2, 1]
console.log(findMaxSubarray(test1), findMaxSubarrayIndexes(test1));
