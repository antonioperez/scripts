// Topological sort is very useful in scheduling products or when you need to arrange a graph in order.
// Topological sorting arranges the nodes in order such that all edges are pointing forward.

// You are given a directed graph of courses a college student has to take. 
// An edge from course A to course B means that you need to finish A before taking course B. 
// Determine the minimum number of semesters to finish all the courses.

class Node {
  constructor(neighborNodes, data){
    this.neighborNodes = neighborNodes;
    this.data = data;
    this.state = 'unvisited';
  }

  getState() {
    return this.state;
  }

  setState(state){
    this.state = state;
  } 

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getNeighbors(){
    return this.neighborNodes;
  }

  setNeighbors(neighbors) {
    this.neighborNodes = neighbors;
  }

}

class Graph {
  constructor(nodes) {
    this.nodes = nodes;
  }

  getNodes(){
    return this.nodes;
  }

  setNodes(nodes) {
    this.node.push(nodes);
  }
}


function topologicalSort(graph){
  const stack = [];
  for (const node of graph.getNodes()) {
    dfsVisit(node, stack);
  }

  return stack;
}

function dfsVisit(node, stack) {
  node.setState('visiting');

  for (const neighbor of node.getNeighbors()) {
    if(neighbor.getState() === 'unvisited') {
      dfsVisit(node, stack);
    }
  }

  node.setState('visited');
  stack.push(node);
}