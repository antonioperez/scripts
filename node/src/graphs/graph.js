class Node {
  constructor(data) {
    this.neighbors = [];
    this.data = data;
    this.state = 'unvisited';
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  addNeighbor(node) {
    this.neighbors.push(node);
  }

  getNeighbors() {
    return this.neighbors;
  }
}

class Graph {
  constructor(nodes) {
    this.nodes = nodes;
  }
  
  addNode(node) {
    this.nodes.push(node);
  }

  getNodes(){
    return this.nodes;
  }
}

// Given a graph and a target number T, find T exists in the graph.

//Depth First Search
function depthFirstSearch(graph, target) {
  const nodes = graph.getNodes();
  for (const node of nodes) {
    if(node.getState() === 'unvisited' && depthFirstSearchVisit(node, target)){
      return true;
    }
  }

  return false;
}

function depthFirstSearchVisit(node, target) {
  node.setState('visiting');

  if(node.getData() === target) {
    return true;
  }

  const neighbors = node.getNeighbors();
  for (const neighbor of neighbors) {
    if(neighbor.getState() === 'unvisited' && depthFirstSearchVisit(neighbor, target)){
      return true;
    }
  }

  node.setState('visited');
  return false;
}

//breadth first search
function breadthFirstSearch(graph, target){
  const nodes = graph.getNodes();
  for (const node of nodes) {
    if(node.getState() === 'unvisited' && breadthFirstSearchVisit(node, target)){
      return true;
    }
  }

  return false;
}

function breadthFirstSearchVisit(startNode, target) {
  const queue = [];
  queue.enqueue(startNode);
  startNode.setState('visiting');

  while(queue.length > 0) {
    const currentNode = queue.dequeue();
    if(currentNode.getData() === target) {
      return true;
    }

    for (const neighbor of currentNode.getNeighbors()) {
      if(neighbor.getState() === 'unvisited') {
        queue.enqueue(neighbor);
        neighbor.setState('visiting');
      }
    }

    currentNode.setState('visited');
  }

  return false;
}