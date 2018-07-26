'use strict';

/*eslint-disable*/
// this comes from package.json (npm i)
const PriorityQueue = require('js-priority-queue');

// this is the new function that accepts graph, startNode and goalNode
module.exports = (graph, startNode, goalNode) => {
  // we are setting up a new set called visitedNodes 
  const visitedNodes = new Set();
  // we are setting up a new map called parentMap
  const parentMap = new Map();
  // we are setting up a new map called shortestPathSoFar 
  const shortestPathSoFar = new Map();

  // we are setting up a new priorityQueue called priorityQueue 
  const priorityQueue = new PriorityQueue({
    // we are setting a sorting method
    comparator: (a, b) => a.priority - b.priority,
  });
  // we are giving priorityQueue a queue method to take in two properties in the object.
  priorityQueue.queue({
    node: startNode,
    priority: 0,
  });
  // we are a startNode to our map?
  shortestPathSoFar.set(startNode, 0);

// setting up a while loop to run as long as there are items in the priorityQueue
  while (priorityQueue.length > 0) {
    // setting up currentNode to dequeue the first node in the priorityQueue
    const currentNode = priorityQueue.dequeue().node;
    
    // this if conditional is checking if we have visited the currentNode if we haven't then continue on?
    if (visitedNodes.has(currentNode)) { continue; }
    // adding currentNode to vistedNodes
    visitedNodes.add(currentNode);
    // this is checking if the currentNode is the goalNode then we have arrived. we go back to parentMap.
    if (currentNode === goalNode) { return parentMap; }
    // storing all the neighbors the currentNode is surrounded with and save them to a neighbors variable. 
    const neighbors = graph.getNeighbors(currentNode);
    // looping through neighbors array
    for (const neighbor of neighbors) {
      // set neighborWeight with a weight property, don't know how we're setting weight though.
      const neighborWeight = neighbor.weight;
      // setting up neighborNode to being the current neighbor.
      const neighborNode = neighbor.node;
      // if we have visited this node already, continue in the loop
      if (visitedNodes.has(neighborNode)) { continue; }
      // set newPathWeight to the summation of shortestPathSoFar and neighborWeight 
      const newPathWeight = shortestPathSoFar.get(currentNode) + neighborWeight;
      // if this neighbor doesn't exist OR if the newPathWeight is less than the value that is saved for the neighbor node 
      if (!shortestPathSoFar.has(neighbor) ||
         newPathWeight < shortestPathSoFar.get(neighborNode)) {
          // then ???
        shortestPathSoFar.set(neighborNode, newPathWeight);
        // then ???
        parentMap.set(neighborNode, currentNode);
          // we put neighbor into priority queue
        priorityQueue.queue({
          // 
          node: neighborNode,
          // 
          priority: shortestPathSoFar.get(neighborNode),
        });
      }
    }
  }
  // to get us out of loop? 
  return null; 
};
