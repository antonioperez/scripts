/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroesForward = function(nums) {
  if (!nums && nums.length < 0) {
    return nums;
  }

  let boundary = 0;
  for (let index = 0; index < nums.length; index++) {
    if (nums[index] === 0) {
      const temp = nums[index];
      nums[index] = nums[boundary];
      nums[boundary] = temp;
      boundary++;
    }
  }

  return nums;
};

const moveZeroesEnd = function(nums) {
  if (!nums && nums.length < 0) {
    return nums;
  }

  let lastNonZeroFoundAt = 0;
  for (let cur = 0; cur < nums.length; cur++) {
    if (nums[cur] != 0) {
      const temp = nums[lastNonZeroFoundAt];
      nums[lastNonZeroFoundAt] = nums[cur];
      nums[cur] = temp;
      lastNonZeroFoundAt++;
    }
  }

  return nums;
};

test1 = [0, 1, 0, 3, 12];
console.log(moveZeroesEnd(test1));
