// Given an array of positive integers, find a subarray that sums to a given number X.For e.g, 
// input = [1,2,3,5,2] and X=8, Result = [3,5] (indexes 2,3)

const findSubarrayForX = (numbers, target) => {
  if(!numbers && numbers.length < 0) {
    return numbers;
  }

  let end = 0;
  let start = 0;
  let sum = numbers[0];
  while (start < numbers.length) {
    if(start > end){
      end = start;
      sum = numbers[start];
    }

    if(sum < target) {
      if(end > numbers.length) {
        break;
      }
      end++;
      sum += numbers[end];
    } else if (sum > target) {
      sum -= numbers[start];
      start++;
    } else { 
      return [start, end];
    }
  }

}

const findSubarraySum = (numbers, target) => {
  if(!numbers && numbers.length < 1) {
    return numbers;
  }

  let sum = numbers[0]; 
  let end = 0;
  let start = 0;
  while (start < numbers.length && end < numbers.length) {
    if(end < start){
      end = start;
      sum = numbers[start];
    }

    if(sum < target) {
      sum += numbers[end];
      end++;
    } else if (sum > target){
      sum -= numbers[start];
      start++;
    } else {
      break;
    }
  }

  return [start, end];
}

const test1 = [1,2,3,5,2]; // 8 == [2,3]
const test2 = [1,2,3,5,2]; // 100 == []
const test3 = [9,29,2,1]; //3 === 2,3

// console.log(findSubarrayForX(test1, 8));
// console.log(findSubarrayForX(test2, 100));
// console.log(findSubarrayForX(test3, 3));

// console.log(findSubarraySum(test1, 8));
// console.log(findSubarraySum(test2, 100));
// console.log(findSubarraySum(test3, 3));



//Given a String, find the longest substring with unique characters.
//For example: "whatwhywhere" --> "atwhy"

const findLongestUniqueSubstring = (string) => {
  if(!string && string.length < 1) {
    return string;
  }

  let start = 0;
  let end = 0;
  let longestString = 1;
  let characterMap = {};
  const result = [start, end];
  
  characterMap[string[start]] = end;
  while (end < string.length - 1){
    end++;
    const character = string[end];
    if(characterMap[character] !== undefined && characterMap[character] >= start) {
      start = characterMap[character] + 1;
    }

    characterMap[character] = end;
    const currentLength = end-start + 1;
    if(currentLength > longestString) {
      longestString = currentLength;
      result[0] = start;
      result[1] = end;
    }
  }

  console.log(characterMap);
  console.log(result);
  console.log(longestString);
  return string.substring(result[0], result[1] + 1);
}

console.log(findLongestUniqueSubstring('whatwhywhere'));