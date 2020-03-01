/*
You are given an array of integers and a pivot. 
Rearrange the array in thefollowing order: 

[all elements less than pivot, elements equal to pivot, elements greater than pivot]
a = [5,2,4,4,6,4,4,3] and pivot = 4 --> result = [3,2,4,4,4,4,5,6]
*/
const rearrangeArrayByPivot = (numbers, pivot) => {
  if(!numbers && numbers.length) {
    return numbers;
  }

  let lowBoundary = 0;
  let index = 0;
  let highBoundary = numbers.length - 1;
  
  while(index <= highBoundary) {
    if(numbers[index] < pivot){
      swap(numbers, index, lowBoundary);
      lowBoundary++;
      index++;
    } else if(numbers[index] > pivot) {
      swap(numbers, index, highBoundary)
      highBoundary--;
    } else {
      index++;
    }
  }
  return numbers;
}

/* 
Given an array with n marbles colored Red, White or Blue, sort them so that marbles of the same color are adjacent, with the colors in the order Red, White and Blue.
Assume the colors are given as numbers - 0 (Red), 1 (White) and 2 (Blue).
For example, if A = [1,0,1,2,1,0,1,2], Output = [0,0,1,1,1,1,2,2].
*/
const arrangeMarbles = (marbles) => {
  if(!marbles && marbles.length < 0){
    return marbles;
  }

  let whiteMarble = 1;
  let lowBoundary = 0;
  let currentIndex = 0;
  let highBoundary = marbles.length - 1;

  while(currentIndex <= highBoundary) {
    if(marbles[currentIndex] < whiteMarble){
      swap(marbles, currentIndex, lowBoundary);
      lowBoundary++;
      currentIndex++;
    } else if (marbles[currentIndex] > whiteMarble) {
      swap(marbles, currentIndex, highBoundary);
      highBoundary--;
    } else {
      currentIndex++;
    }
  }
  return marbles;
}

const swap = (numbers, indexA, indexB) => {
  const temp = numbers[indexA];
  numbers[indexA] = numbers[indexB];
  numbers[indexB] = temp;
}

console.log(rearrangeArrayByPivot([5,2,4,4,6,4,4,3], 4))
console.log(rearrangeArrayByPivot([5,2,4,4,6,4,4,3], 1))
console.log(rearrangeArrayByPivot([5,2,4,4,6,4,4,3], 10))

console.log(arrangeMarbles([2,0,2,1,1,0]));