/* 

Maze Problem: You are given a 2D array that represents a maze. 
It can have 2 values - 0 and 1. 1 represents a wall and 0 represents a path. 
The objective is to reach the bottom right corner, i.e, A[A.length-1][A.length-1]. 
You start from A[0][0]. You can move in 4 directions - up, down, left and right. 
Find if a path exists to the bottom right of the maze.

*/

const STATES =  {
  UNVISITED: 2,
  VISITING: 3,
  NOPATHFOUND: 4
}

function isMazeComplete(maze) {
  if(!maze || maze.length == 0) {
    return false
  }

  const map = [];
  maze.forEach(() => {
    map.push(new Array(maze[0].length).fill(STATES.UNVISITED));
  });

  return doesPathExit(maze, 0, 0, map);
}

function doesPathExit(maze, x, y, map) {
  console.log(map);
  if(isOutOfBounds(maze, x, y) || maze[x][y] === 1) {
    return false;
  }

  if(map[x][y] === STATES.NOPATHFOUND || map[x][y] === STATES.VISITING) {
    return false;
  }

  if(x === maze.length - 1 && y === maze[0].length - 1){
    return true;
  } 

  map[x][y] = STATES.VISITING;
  const directions = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1]
  ];

  for (let index = 0; index < directions.length; index++) {
     if(doesPathExit(maze, directions[index][0], directions[index][1], map)){
       return true;
     }
  }

  map[x][y] = STATES.NOPATHFOUND;
  return false;
}

function isOutOfBounds(maze, x, y) {
  return x < 0 || y < 0 || x >= maze.length || y >= maze.length;
}

const maze = [
  [0,1,0,0,0],
  [0,1,0,1,0],
  [0,1,0,1,0],
  [0,1,0,1,1],
  [0,0,0,0,0]
]

console.log(isMazeComplete(maze));