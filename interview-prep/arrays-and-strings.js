//Traverse from Both Ends

// Given a sorted array in non-decreasing order, 
// return an array of squares of each number, also in non-decreasing order
// [-4,-2,-1,0,3,5] -> [0,1,4,9,16,25]

function squareSortedNumbers(numbers) {
  const result = [];
  let start = 0;
  let end = numbers.length - 1;
  let lastIndex = end;

  while (start <= end) {
    const leftNumber = Math.pow(numbers[start], 2);
    const rightNumber = Math.pow(numbers[end], 2);

    if (leftNumber < rightNumber) {
      result[lastIndex] = rightNumber;
      end--;
    } else {
      result[lastIndex] = leftNumber;
      start++;
    }

    lastIndex--;
  }

  return result;
}

console.log(squareSortedNumbers([-4,-2,-1,0,3,5]));