/**
 * Given an array of numbers, 
 * replace each even number with two of the same number. 
 * 
 * e.g, [1,2,5,6,8, , , ,] -> [1,2,2,5,6,6,8,8]
 * **/


 test1 = [1,2,5,6,8];
 test2 = [1,2,2,7,8];
 test3 = [0, 0];
 test4 = [1,1];
 test5 = null;

 function cloneEvenNumbers(numbers) {
   if(!numbers || numbers.length === 0) {
     return numbers;
   }

   let numbersLength = numbers.length - 1;
   let lastIndex = getEndArrayLength(numbers);

   for (let index = numbersLength; index >= 0; index--) {
     const number = numbers[index];
     if (number % 2 === 0){
        lastIndex -= 1;
        numbers[lastIndex] = numbers[index];
     }
     lastIndex -= 1;
     numbers[lastIndex] = numbers[index];
   }

   return numbers;
 }

 function getEndArrayLength(numbers) {
   let size = 0;
   numbers.forEach(number => {
     if(number % 2 === 0) {
       size += 1;
     }
     size += 1;
   });

   return size;
 }

 console.log(cloneEvenNumbers(test1));
 console.log(cloneEvenNumbers(test2));
 console.log(cloneEvenNumbers(test3));
 console.log(cloneEvenNumbers(test4));
 console.log(cloneEvenNumbers(test5));