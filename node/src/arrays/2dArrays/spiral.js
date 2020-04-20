//Print elements of a matrix in spiral order

function printSpiral(array){
  for (let layer = 0; layer <= array.length / 2; layer++) {
    const lastColumn = array[0].length - 1 - layer;
    const lastRow = array.length - 1 - layer;
    printLayer(array, layer, lastColumn, lastRow);
  }
}

function printLayer(array, layer, lastColumn, lastRow) {
  if (lastColumn == layer && lastRow == layer) {
    console.log(array[layer][layer]);
  }

  for (let current = layer; current < lastColumn; current++) {
    console.log(array[layer][current]); //top row
  }

  for (let current = layer; current < lastRow; current++) {
    console.log(array[current][lastColumn]) //right column
  }

  for (let current = lastColumn; current > layer; current--) {
    console.log(array[lastRow][current]); //bottom row
  }

  for (let current = lastRow; current > layer; current--) {
    console.log(array[current][layer]) //left column
  }
}

console.log(printSpiral([
  [2,3,1,6],
  [12,13,5,7],
  [8,4,11,9],
]))