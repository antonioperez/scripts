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