// 1. (Level: Medium) Rotate a 2D array clockwise by 90 degrees, like rotating the pixels of an image.

function rotate2DArray(array){
 for (let layer = 0; layer  < array.length / 2; layer ++) {
   rotate(array, layer, array.length - 1 - layer);
 }

 return array;
}

function rotate(array, start, end) {
  for (let current = 0; start + current < end; current++) {
    const temp = array[start][start + current]; //save top
    array[start][start + current] = array[end - current][start]; //left to top
    array[end - current][start] = array[end][end - current]; //bottom to left
    array[end][end - current] = array[start + current][end]; //right to bottom
    array[start + current][end] = temp; //top to right
  }
}

console.log(rotate2DArray(
  [
    [1, 1, 1, 1],
    [2, 2, 2, 2],
    [3, 3, 3, 3],
    [4, 4, 4, 4]
  ]
));
//[
// [4,3,2,1],
// [4,3,2,1],
// [4,3,2,1],
// [4,3,2,1]]