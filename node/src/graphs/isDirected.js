//Given a graph, find if there is a cycle

class Node {
  constructor(data, neighbors) {
    this.data = data;
    this.state = 'unvisited';
    this.neighbors = neighbors;
  }

  getNeighbors(){
    return this.neighbors;
  }

  setState(state){
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

class Graph {
  constructor(nodes) {
    this.nodes = nodes;
  }

  getNodes(){
    return this.nodes;
  }
}


function hasCycleDFS(graph) {
  const nodes = graph.getNodes();
  
  for (const node of nodes) {
    if(node.getState() === 'unvisited' && hasCycleDFSVisit(node)){
      return true;
    }
  }

  return false;
}


function hasCycleDFSVisit(node) {
  node.setState('visiting');
  const neighbors = node.getState();
  for (const neighbor of neighbors) {
    if(neighbor.getState === 'unvisited' && hasCycleDFSVisit(neighbor)) {
      return true;

    } else if (neighbor.getState === 'visiting') {
      return true;
    }
  }

  node.setState('visited');
  return false;
}