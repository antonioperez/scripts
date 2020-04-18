// Question: ClimbingStepsProblem
// Let’s say you have to climb N steps. 
// You can jump 1 step, 3 steps or 5 steps at a time. 
// How many ways are there to get to the top of the steps.

//Dynamic Programming Bottom Up Approach using Tabulation
function waysToClimbBtmUp(steps){
  const stepsArray = new Array(steps + 1).fill(0);
  stepsArray[0] = 1;

  for (let index = 0; index < stepsArray.length; index++) {
    const oneAhead = index + 1;
    const threeAhead = index + 3;
    const fiveAhead = index + 5;

    if(oneAhead < stepsArray.length){
      stepsArray[oneAhead] += stepsArray[index];
    }

    if(threeAhead < stepsArray.length) {
      stepsArray[threeAhead] += stepsArray[index];
    }

    if(fiveAhead < stepsArray.length) {
      stepsArray[fiveAhead] += stepsArray[index];
    }
    
    console.log(stepsArray);
  }

  return stepsArray[steps];

}

console.log(waysToClimbBtmUp(8))

//Top Down Approach usingTabulation
function waysToClimbTopBottom(steps) {
  const stepsArray = new Array(steps + 1).fill(0);
  stepsArray[0] = 1;

  for (let index = 1; index < stepsArray.length; index++) {
    const oneBehindIndex = index - 1;
    const threeBehindIndex = index - 3;
    const fiveBehindIndex = index - 5;

    const oneBehind = oneBehindIndex < 0 ? 0 : stepsArray[oneBehindIndex];
    const threeBehind = threeBehindIndex < 0 ? 0 : stepsArray[threeBehindIndex];
    const fiveBehind = fiveBehindIndex < 0 ? 0 : stepsArray[fiveBehindIndex];
    stepsArray[index] = oneBehind + threeBehind + fiveBehind;
  }

  return stepsArray[steps];
}

console.log(waysToClimbTopBottom(8))