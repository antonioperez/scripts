// 1. (Level: Medium) Given a list of stock prices for a company, 
// find the maximum amount of money you could have made with one trade (one buy/sell). 
// For example, if A = [2,3,1,4,5,7,5,4], the max money with a single trade is 6, 
// if you buy at 1 and sell at 7.

function findMaxTrade(stockPrices){
  let minPriceSoFar = Infinity;
  let maxDifference = 0;

  for (let index = 0; index < stockPrices.length; index++) {
    const stockPrice = stockPrices[index];

    if(stockPrice < minPriceSoFar){
      minPriceSoFar = stockPrice;
    }

    const minPrice = stockPrice - minPriceSoFar;
    if(maxDifference < minPrice) {
      maxDifference = minPrice;
    }
  }

  return maxDifference;
}

console.log(findMaxTrade([2,3,1,4,5,7,5,4]));


//How much money could you have made with 2 trades?
function findMaximumTradeProfits(stockPrices, tradeNums) {

  const bestTill = new Array(stockPrices.length);
  let minSoFar = Infinity;
  let maxDiff = 0;

  for (let index = 0; index < stockPrices.length; index++) {
    const stockPrice = stockPrices[index];
    minSoFar = Math.min(minSoFar, stockPrice);
    maxDiff = Math.max(maxDiff, stockPrice - minSoFar);
    bestTill[index] = maxDiff;
  }

  let bestFrom = new Array(stockPrices.length);
  let maxSoFar = -Infinity;
  maxDiff = 0;

  for (let index = stockPrices.length; index >= 0; index--) {
    const stockPrice = stockPrices[index];
    maxSoFar = Math.max(maxSoFar, stockPrice);
    maxDiff = Math.max(maxDiff, maxSoFar - stockPrice);
    bestFrom[index] = maxDiff;
  }

  let maxTwoTrades = 0;
  for (let index = 0; index < stockPrices.length; index++) {
    let maxSecondTrade = (index + 1 < stockPrices.length) ? bestFrom[index + 1] : 0;
    maxTwoTrades = Math.max(maxSecondTrade, bestTill[index] + maxSecondTrade);
  }

  return maxTwoTrades;
}

console.log(findMaximumTradeProfits([2,3,5,-100,5,7,5,4,100], 2))