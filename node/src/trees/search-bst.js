/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
const searchBST = function(root, val) {
  if(!root) {
      return root;
  }
  
  if(root.val === val){
      return root;
  } else if(val < root.val){
      return searchBST(root.left, val);
  } else if(val > root.val) {
      return searchBST(root.right, val);
  }
};

// search arrays
const searchBSTInter = function(numbers, target) {
    if(!numbers && numbers.length < 1){
        return numbers;
    }

    let start = 0;
    let end = numbers.length - 1;

    while(start <= end) {
        const mid = Math.floor(start + (end - start) / 2);
        console.log(mid, numbers[mid]);
        if(numbers[mid] === target){
            return mid;
            
        } else if(numbers[mid] < target){
            start = mid + 1;

        } else if (numbers[mid] > target) {
            end = mid - 1;
        }
    }

    return null;
}

const test1 = [2,3,4,5,7,7,7,8];
const test2 = [];

console.log(searchBSTInter(test1, 7));


// Given a sorted array A that has been rotated in a cycle, find the smallest element of the array in O(log(n)) time. For example,
// [1,2,4,5,7,8] rotated by 3 gives us A = [5,7,8,1,2,4] and the smallest number is 1.
// [1,2,4,5,7,8] rotated by 1 gives us A = [8,1,2,4,5,7] and the smallest number is 1.