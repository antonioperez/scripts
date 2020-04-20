//Print a 2D array in Diagonal ZigZag order.
//For example, 
//Input: 
// 1 2 3 4
// 5 6 7 8 
// 9 0 1 2
//Output: 1 2 5 9 6 3 4 7 0 1 8 2

function printZigZag(array) {
  let row = 0;
  let column = 0;
  let isUp = true;

  if(array.length <= 1 || array[0].length <= 1) {
    console.log(array);
    return;
  }

  while(true) {
    console.log(array[row][column]);
    //if on boundary, shift to the next diagonal, print and change direction.
    if ((row === 0 || row === array.length - 1) && column != array[0].length - 1) {
      column++;
      console.log(array[row][column]);
      isUp = !isUp;
    } else if (column === 0 || column == array[0].length - 1){
      row++;
      console.log(array[row][column]);
      isUp = !isUp;
    }

    if(row === array.length -1 && column == array.length - 1){
      break;
    }

    row = isUp ? row - 1: row +1;
    column = isUp ? column + 1: column - 1;
  }
}

console.log(printZigZag([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 0, 1, 2]
]))