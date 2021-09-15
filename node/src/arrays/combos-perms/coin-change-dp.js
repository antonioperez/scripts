// Given a set of possible point redemptions, print out the number of ways you can redeem them?
// ex) { 180, 150, 140, 70 } and the user has 500 points. 
// answer: 5 ways to redeem
// detailed answer:
//    [ 180, 180, 140 ]
//    [ 180, 180, 70, 70 ]
//    [ 150, 140, 140, 70 ]
//    [ 150, 140, 70, 70, 70 ]
//    [ 150, 70, 70, 70, 70, 70 ]

function getPossiblePointRedemptionCount(userPointsAmount, possiblePointRedemptions){
  const possibleRedeemableCounts = new Array(userPointsAmount + 1).fill(0);
  possibleRedeemableCounts[0] = 1;
  
  for (const possiblePointRedemption of possiblePointRedemptions) {
    for (let possibleIndex = possiblePointRedemption; possibleIndex <= userPointsAmount; possibleIndex++) {
      possibleRedeemableCounts[possibleIndex] += possibleRedeemableCounts[possibleIndex - possiblePointRedemption];
    }
  }

  return possibleRedeemableCounts.reduce((accumulator, redeemableCount, currentIndex) => {
    if (currentIndex === 0) {
      // don't count no choice as a possible redemption choice.
      return 0;
    }

    return accumulator + redeemableCount;
  }, 0);
}

// nothing also counts. Lets ignore.

// 1 1 1 1 1
// 1 1 1 1
// 1 1 1 
// 1 1 
// 1
// 1 1 3
// 1 3
// 3 
// 5  
console.log(getPossiblePointRedemptionCount(5, [1, 3, 5]));

//ANSWER: 9 ways. 