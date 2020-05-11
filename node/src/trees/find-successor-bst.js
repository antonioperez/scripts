//Find the in-order successor of a given node in a BST. 
class TreeNode {
  constructor(data, left, right) {
    this.data = data;
    this.left = left; 
    this.right = right;
  }
}

function findSuccessor(node, root){
  if(!node){
    return null;
  }

  let successor;
  if(node.right) {
    while(node.left){
      node = node.left;
      successor = node;
    }

    return successor;
  }

  let current = root;
  while(current) {
    if (current.data < node.data) {
      current = current.right;
    } else if (current.data > node.data){
      successor = current;
      current = current.left;
    } else if (current.data === node.data) {
      break;
    }
  }

  return successor;
}
