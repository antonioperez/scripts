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

//Given an array of integers, both -ve and +ve, 
// find a contiguous subarray that sums to a number X.
// For example: [2,4,-2,1,-3,5,-3], X = 5 --> Result = [2,4,-2,1]

function findSubarrayForTarget(numbers, target) {
  if(!numbers && numbers.length < 1) {
    return numbers;
  }

  const sums = {};
  let sum = 0;
  for (let index = 0; index < numbers.length; index++) {
    sum += numbers[index];
    if (sum === target) {
      return [0, index];
    }

    const pastSum = sum - target;
    console.log(sums, sum, target, pastSum);
    if(sums[pastSum] !== undefined){
      return [sums[pastSum] + 1, index]
    }

    sums[sum] = index;
  }
}

//Given a list of non-negative numbers and a target integer k, 
// write a function to check if the array has a continuous subarray of size at least 2 that sums up to a multiple of k, 
// that is, sums up to n*k where n is also an integer.
function checkSubarraySum(numbers, target){
  if(!numbers && numbers.length < 0) { 
    return false;
  }

  const results = {'0':-1};
  let currentReminder = 0;
  for (let index = 0; index < numbers.length; index++) {
    if (numbers[index] == 0 && numbers[index + 1] == 0 && target===0) {
      return true;
    } else if (target !== 0){
      currentReminder += numbers[index];
      currentReminder = currentReminder % target;
      if(results[currentReminder] !== undefined){
        if (index - results[currentReminder] > 1) {
          return true;
        }
      } else {
        results[currentReminder] = index;
      }
    }
  }
  
  return false;
}

let test1 = [1,2,-1,2,-3,2,-5];
console.log(findMaxSubarray(test1));

test1 = [-2,-3,4,-1,-2,1,5,-1];
test1 = [1, -2, 1, 1, -2, 1]
console.log(findMaxSubarray(test1));

console.log(checkSubarraySum([23, 2, 6, 4, 7], 6))
console.log(checkSubarraySum([0,0], -1))
console.log(checkSubarraySum([1,2,3], 5))

console.log(findSubarrayForTarget([2,3,-4,1,-3,5,-3], -2))