class TreeNode {
  constructor(data, left = null, right = null){
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

//Find the height of the binary tree
function getTreeHeight(node){
  if(!node) {
    return 0;
  }

  return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
}

//Given a binary tree, is it balanced or not?
function isBalancedTree(treeNode){
  const leftHeight = getTreeHeight(treeNode.left);
  const rightHeight = getTreeHeight(treeNode.right);

  return leftHeight - rightHeight <= 1;
}

//Find the Diameter of a Binary Tree. The Diameter is the longest path from any 2 nodes in the tree.
// returns [height, lonestPathThisSubTree];
function diameter(treeNode){
  if (!treeNode) {
    return null;
  }

  const leftResult = diameter(treeNode.left);
  if(!leftResult) {
    leftResult = [0,0];
  }

  const rightResult = diameter(treeNode.right);
  if(!rightResult){
    rightResult = [0,0]
  }

  const longestPathThisNode = leftResult[0] + rightResult[0] + 1;
  let longestPathThisSubTree = Math.max(leftResult[1], rightResult[1]);
  longestPathThisSubTree = Math.max(longestPathThisNode, longestPathThisSubTree);

  const height = Math.max(rightResult[0], leftResult[0]) + 1;
  return [height, longestPathThisSubTree];
}