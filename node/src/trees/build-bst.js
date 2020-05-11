//Given a sorted array,build a balanced binary search tree.

class TreeNode {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

function buildTree(numbers){
  return buildTreeHelper(numbers, 0, numbers.length);
}

function buildTreeHelper(numbers, start, end){
  if(start > end || isOutOfBounds(numbers, start) || isOutOfBounds(numbers, end)) {
    return null;
  }

  const midIndex = start + (end - start) / 2;
  const root = new TreeNode(numbers[midIndex]);
  root.left = buildTreeHelper(numbers, start, midIndex--);
  root.right = buildTreeHelper(numbers, midIndex++, end);

  return treeNode;

}

function isOutOfBounds(numbers, index){
  return index < 0 || index >= numbers.length;
} 