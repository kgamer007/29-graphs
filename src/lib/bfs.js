export default (graph, startNode, goalNode) => {
  const queue = [];
  const visitedNodes = new Set(); 
  const parentMap = new Map(); 

  // Just like Judy's dfs we will have a queue method to instantiate a starting node
  queue.push(startNode);

  // add method here is basically adding the root node to start with.
  visitedNodes.add(startNode); 

  // setting a loop where there are items in the queue list
  while (queue.length) {
    const currentNode = queue.pop();

    // this if condition basically sets us up for when we reach the node we need we add it to the visited nodes to keep track of it
    if (currentNode === goalNode) {
      return parentMap;
    }
    const neighbors = graph.getNeighbors(currentNode);

    for (let i = 0; i < neighbors.length; i++) {
      const neighborNode = neighbors[i].node;
      if (visitedNodes.has(neighborNode)) {
        continue; // eslint-disable-line
        // honestly I don't know why this is being an issue... but I refactored my for loop to get rid of the let and of linter error. 
      }
    
      visitedNodes.add(neighborNode);
      parentMap.set(neighborNode, currentNode);
      queue.push(neighborNode);
    }
  }
  return null;
};
