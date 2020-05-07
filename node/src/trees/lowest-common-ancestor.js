class TreeNode {
  constructor(data, left, right, parent) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

//raise both nodes to same level. Go up.
function getLowestCommonAncestor(treeNodeA, treeNodeB) {
  if(!treeNodeB && !treeNodeA) {
    return null;
  }

  let nodeAHeight = 0;
  let nodeBHeight = 0;

  let nodeAParent = treeNodeA.parent;
  while(nodeAParent) {
    nodeAHeight++;
    nodeAParent = nodeAParent.parent;
  }

  let nodeBParent = treeNodeB.parent;
  while(nodeBParent){
    nodeBHeight++;
    nodeBParent = nodeBParent.parent;
  }

  let lowestNode = nodeAHeight < nodeBHeight ? treeNodeA: treeNodeB;
  for (let count = 0; count < Math.abs(nodeBHeight - nodeAHeight); index++) {
    lowestNode = lowestNode.parent;
  };

  let highNode = nodeAHeight > nodeBHeight ? treeNodeA: treeNodeB;
  while(highNode !== lowestNode) {
    highNode = highNode.parent;
    lowestNode = lowestNode.parent;
  }
  
  return highNode;
}

function getLowestCommonAncestorWithoutParent(node, nodeA, nodeB){
  if(!node) {
    return null;
  }
  
  if(nodeA === node || nodeB === node) {
    return node;
  }

  const leftLCA = getLowestCommonAncestorWithoutParent(node.left, nodeA, nodeB);
  const rightLCA = getLowestCommonAncestorWithoutParent(node.right, nodeA, nodeB);

  if(!leftLCA && !rightLCA) {
    return node;
  }

  return leftLCA != null ? leftLCA : rightLCA;
}