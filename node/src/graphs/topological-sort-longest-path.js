// Diameter of a Graph: Given a directed graph, 
// find the length of the longest path in the graph.

getLongestPathCount(graph){
  topoSortStack = topologicalSort(graph);
  let diameter = 0;

  while(topoSortStack.length > 0) {
    const currentNode = topoSortStack.pop();
    const currentLongPath = current.getLongestPath() + 1;

    diameter = Math.max(diameter, current.getLongestPathCount());

    for (const neighbor of currentNode.getNeighbors()) {
      if(currentLongPath > neighbor.getLongestPath()){
        neighbor.setLongestPath(currentLongPath);
      }
    }

    return diameter;
  }
}