//Given a Binary Tree, determine if it is a Binary Search Tree (BST)
class TreeNode {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

function isBST(node) {
  return !isBSTHelper(node) === false;
}

function isBSTHelper(node) {
  if(!node){
    return [Infinity, -Infinity];
  }


  let leftMinMax = isBSTHelper(node.left);
  let rightMinMax = isBSTHelper(node.right);

  if(!rightMinMax || !leftMinMax) {
    return false;
  }

  if(leftMinMax[1] > node.data || rightMinMax[0] < node.data) {
    return false;
  }

  let min = !node.left ? node.data : left[0];
  let max = !node.right ? node.data : right[1]; 
  return [min, max];
}