// Given an array of integers, find the continuous subarray, which when sorted, 
// results in the entire array being sorted. 
// For example: A = [0,2,3,1,8,6,9], result is the subarray [2,3,1,8,6]
// return as paid of indices

function getLength(startIndex, endIndex){
  if (startIndex < 0){
    return 0;
  }

  let result = 0;
  for (let index = startIndex; index <= endIndex; index++) {
    result++;
  }
  return result;
}
// [1,2,4,5,3,5,6,7] --> [4,5,3] - If you sort from indices 2 to 4, the entire array is sorted.
// [1,3,5,2,6,4,7,8,9] --> [3,5,2,6,4] -  If you sort from indices 1 to 5, the entire array is sorted

// console.log(findUnsortedSubarray([1,2,4,5,3,5,6,7]));
// console.log(findUnsortedSubarray([1,3,5,2,6,4,7,8,9]));
// console.log(findUnsortedSubarray([2,6,4,8,10,9,15]));
console.log(findUnsortedSubarray([2,3,3,2,4]));


function findUnsortedSubarray(a) {
  if (a == null || a.length == 0) return 0;    
  
  let start = null;
  let end = null;
  let arrayLength = a.length - 1;
  
  //find dip
  for (start = 0; start < arrayLength; start++){
    if(a[start + 1] < a[start]){
      break;
    }
  }

  if(start === arrayLength) return 0;

  //find bump
  for(end = arrayLength; end > 0; end--){
    if(a[end-1] > a[end]){
      break;
    }
  }

  //find min and max of a[start...end]
  let max = -Infinity;
  let min = Infinity;
  for (let index = start; index <= end; index++) {
    if(a[index] > max){
      max = a[index];
    }

    if(a[index] < min) {
      min = a[index];
    }
  }

  //expand start and end outward
  while (start > 0 && a[start - 1] > min) {
    start--;
  }

  while (end < arrayLength && a[end+1] < max){
    end++;
  }

  return [start, end, getLength(start, end)]
 }