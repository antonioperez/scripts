// given two arrays that represent numbers
// find the sum.

function add(firstNumber, secondNumber){
  const larger = firstNumber.length > secondNumber.length ? firstNumber : secondNumber;
  const smaller = larger == firstNumber ? firstNumber : secondNumber;
  const result = new Array[larger.length + 1];
  let carry = 0;

  smaller = resizeWithZeroes(smaller, larger.length);
  for (let index = larger.length - 1; index >= 0; index--) {
    const sum = larger[index] + smaller[index] + carry;
    carry = sum / 10;
    result[index + 1] = sum % 10;
  }

  result[0] = carry;
  result = trimBeginningZeros(result);
  return result;
}

console.log(add([1,2], [9]));