class TreeNode{
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// get tree height
function getTreeHeight(treeNode, currentHeight = -1, maxHeight = -1) {
  if (treeNode === null) {
    return;
  }

  currentHeight += 1;
  if(currentHeight > maxHeight){
    maxHeight = currentHeight;
  }

  getTreeHeight(node.left, currentHeight, maxHeight);
  getTreeHeight(node.right, currentHeight, maxHeight);

  console.log(maxHeight);
}

//Given a Binary Tree, print all paths from root to leaf.
function printTreePath(treeNode){
  printPath(treeNode);
}

function printPath(treeNode, path = []){
  if(!treeNode){
    return;
  }

  path.push(treeNode.data);
  if(!(treeNode.left && treeNode.right)) {
    console.log(path);
  }

  printPath(treeNode.left, path);
  printPath(treeNode.right, path);

  path.pop();
}