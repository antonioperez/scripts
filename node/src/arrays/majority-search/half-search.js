// You ​​are ​​given ​​an​​ array ​​of ​​numbers.​​ 
// Find a ​​number ​​that ​​occurs ​​more ​​than ​​half​ ​the ​​time. 
// Find ​​the ​​number. ​​For ​​example,
// A​​=>​​[4,2,3,4,4,5,4,4,5,4,4],​​Result ​​is ​4
// A​​=>​​[2,4,6,6,3,6,7,9,5,3], ​​There​​ is ​​no​​ result ​​because ​​there​​ is ​no ​​majority

function majorityFind(numbers){
  if(!numbers || numbers.length < 1){
    return null;
  }

  let candidate = numbers[0];
  let count = 1;

  //cancel numbers
  for (const num of numbers) {
    if(candidate === num){
      count++
    } else if(count > 0){
      count--;
    } else {
      candidate = num;
      count = 1;
    }
  }

  //count occurrences
  count = 0;
  for (const num of numbers) {
    if(candidate === num){
      count++;
    }
  }

  return count > numbers.length/2 ? candidate : null;
}