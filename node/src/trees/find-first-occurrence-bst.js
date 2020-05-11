//Given a BST that can contain duplicate elements, 
// find the first occurrence of a number N

class Node {
  constructor(data, left, right){
    this.data = data; 
    this.left = left; 
    this.right = right;
  }
}

function findFirstOccurrence(node, target) {
  let result;
  let currentNode = node;
  
  while(currentNode) {
    if(currentNode.data > target){
      currentNode = currentNode.left;
    } else if (currentNode.data < target){
      currentNode = currentNode.right;
    } else {
      result = currentNode.data;
      currentNode = currentNode.left;
    }
  }

  return result;
}