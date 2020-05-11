class Node {
  constructor(data, left, right){
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

//Lowest Common Ancestor: Given a Binary Search Tree and 2 nodes A and B, 
//find their lowest common ancestor.

function findLCA(node, a, b){
  let current = node;
  
  const aData = a.data;
  const bData = b.data;
  while(current){
    currentData = current.data;
    if(currentData < aData && currentData < bData){
      current = current.right;
    } else if (currentData > aData && currentData > bData){
      current = current.left;
    } else {
      return current;
    }
  }

  return null;
}