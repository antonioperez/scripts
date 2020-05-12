class TreeNode {
  constructor(data, left, right){
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

function inOrderPrint(node){
  if(node){
    inOrderPrint(node.left);
    console.log(node.data);
    inOrderPrint(node.right);
  }
}

function postOrderPrint(node){
  if(node){
    postOrderPrint(node.left);
    postOrderPrint(node.right);
    console.log(node.data);
  }
}

function preOrderPrint(node){
  if(node){
    console.log(node.data);
    preOrderPrint(node.left);
    preOrderPrint(node.right);
  }

  return;
}

class TreeNode {
  constructor(data, isVisited, left, right) {
    this.data = data;
    this.isVisited = isVisited;
    this.left = left;
    this.right = right;
  }
}

function printInOrderIter(treeNode){
  const stack = [];
  stack.push(treeNode);

  while(stack.length > 0){
    const node = stack.pop();

    if(node.isVisited){
      console.log(node.data);
    } else {
      node.isVisited = true;
      if(node.right){
        stack.push(node.right);
      }

      stack.push(node);

      // we push left after right so that it isaccessed first
      if(node.left){
        stack.push(node.left);
      }
    }
  }
}