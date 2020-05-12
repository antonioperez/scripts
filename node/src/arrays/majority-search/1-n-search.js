//For example:
// A = [2,4,5,2,4,2,2,1,5] and K = 3, Result = 2, which occurs more than Length/3 times.
// B = [2,4,5,2,4,2,6,1,5] and K = 3, No result as there is no number occurring > Length/3 times.

// Note: It is easy to do this in O(n) space. We want to solve it with O(k) space.

function findKMajority(numbers, k = 3) {
  const countMap = {};

  for (const num of numbers) {
    //count
    if(countMap[num]){
      countMap[num] =+ 1;
    } else {
      countMap[num] = 1;
    }

    //​​discard​​ if ​​K​​ unique​​ elements ​​exist
    if(Object.keys(countMap).length === k){
      for (const num in countMap) {
        countMap[num] -= 1;
        if(countMap[num] < 1){
          delete countMap[num];
        }
      }
    }
  }

  //reset count
  for (const num in countMap) {
    countMap[num] = 0;
  }

  //count each occurrence
  for (const num of object) {
    if(countMap[num]){
      countMap[num] += 1;
    }
  }

  //check if any have majority
  for (const num of object) {
    if(countMap[num] > numbers.length / k){
      return countMap[num];
    }
  }

  return null;
}