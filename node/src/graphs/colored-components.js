// Given a graph, mark each connected component with a different color


class Node {
  constructor(data, color, neighbors){
    this.data = data;
    this.color = color;
    this.neighbors = neighbors;
    this.state = 'unvisited';
  }
}

class Graph {
  constructor(nodes) {
    this.nodes = nodes;
  }
}

function colorGraphComponents(graph){
  const color = 0;
  for (const node of graph.getNodes()) {
    if(node.state === 'unvisited') {
      dfsColorVisit(node, color++);
    }
  }
}

function dfsColorVisit(node, color){
  node.state = 'visiting';
  node.color = color;

  for (const neighbor of node.neighbors) {
    if(neighbor.state === 'unvisited') {
      dfsColorVisit(neighbor, color);
    }
  }

  node.state = 'visited';
}