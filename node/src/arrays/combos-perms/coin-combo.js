// Coin Change Problem: Given a set of coin denominations, 
// print out the different ways you can make a target amount. 
// You can use as many coins of each denomination as you like. 
// For example: If coins are [1,2,5] and the target is 5, 
// output will be: [1,1,1,1,1][1,1,1,2][1,2,2][5]



function printCoinChange(coins, target){
  if(!coins || coins.length === 0 || target <= 0) {
    return coins;
  }

  printCoinChangeHelper(coins, target, 0, [], 0);
}

function printCoinChangeHelper(coins, target, startIndex, buffer, sum){
  if (sum > target){
    return;
  }

  if(sum === target) {
    console.log(buffer);
    return;
  }

  for (let index = startIndex; index < coins.length; index++) {
    buffer.push(coins[index]);
    printCoinChangeHelper(coins, target, startIndex, buffer, sum + coins[index]);
    buffer.pop()
  }
 }

//printCoinChange([1,2,5], 5);

function footballScoreCombos(scores, target) {
  if(!scores || scores.length === 0 || target <= 0) {
    return scores;
  }

  footballScoresHelper(scores, target, 0, [], 0);
}

function footballScoresHelper(scores, target, startIndex, buffer, sum) {
  if (sum > target) {
    return;
  }

  if(sum === target) {
    console.log(buffer);
    return;
  }

  for (let index = startIndex; index < scores.length; index++) {
    const score = scores[index];
    buffer.push(score);
    footballScoresHelper(scores, target, index, buffer, sum + score);
    buffer.pop();
  }
}

// footballScoreCombos([3,6,1], 10);


console.log(footballScoreCombos([1,3,5], 5));