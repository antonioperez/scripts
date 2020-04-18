// Longest Increasing Subsequence: 
// Given an array of integers, find the length of the longest increasing subsequence.
// For e.g, in [1, 3, 2, 5, 3, 5, 6], the longest increasing subsequence is [1, 2, 3, 5, 6] of length 5


function longestIncreasingSubsequence(numbers) {
  const longestSubsequence = new Array(numbers.length).fill(0);
  let max = 1;
  
  for (let index = 0; index < numbers.length; index++) {
    longestSubsequence[index] = 1;
    console.log(longestSubsequence);
    for (let j = 0; j < index; j++) {
      if(numbers[j] < numbers[index]){
        longestSubsequence[index] = Math.max(longestSubsequence[index], longestSubsequence[j] + 1);
      }
    }
    
    max = Math.max(max, longestSubsequence[index]);
  }

  return max;
}

console.log(longestIncreasingSubsequence([1, 3, 2, 5, 3, 5, 6]));
