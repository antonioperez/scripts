
//Coin Change - Print Count: 
// Given a set of coin denominations, 
// print out the number of ways you can make a target amount. 
// You can use as many coins of each denomination as you like

// For example: 
// If coins are [1,2,5] and the target is 5, 
// the different ways are: 
// [1,1,1,1,1]
// [1,1,1,2]
// [1,2,2]
// [5]
//The Output will be 4.

function getCoinCombinations(targetAmount, coins){
  const coinAmounts = new Array(targetAmount + 1).fill(0);
  coinAmounts[0] = 1;
  
  for (const coin of coins) {
    for (let index = coin; index <= targetAmount; index++) {
      coinAmounts[index] += coinAmounts[index - coin];
    }

    console.log(coinAmounts);
  }

  return coinAmounts[targetAmount];
}


console.log(getCoinCombinations(5, [2,5,1]));