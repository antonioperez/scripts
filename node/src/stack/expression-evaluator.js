// Given an arithmetic expression with*,/,-&+
// operators and single digit numbers,
// evaluate it and return the result.

// For example, 1 + 2 / 1 + 3 * 2 ==> 9

function evaluate(expression){
  if(!expression || expression.length < 0) {
    return null;
  }

  const operands = [];
  const operators = [];
  for (const char of expression) {
    if(isOperand(char)){
      operands.push(char);

    } else if(isOperator(char)){
      const lastOperand = operators[operators.length - 1];
      while(operators.length > 0 && precedence(lastOperand) >= precedence(char)){
        process(operators, operands);
      }
      operators.push(char);
      
    } else if (char === '(') {
      operators.push(char);

    } else if (char === ')') {
      while(operators[operators.length - 1] != '('){
        process(operators, operands);
      }

      operators.pop();
    }
  }

  while(operators.length > 0) {
    process(operators, operands);
  }

  return operands.pop();
}

function isOperator(char){
  const operators = ['/', '*', '+', '-'];
  return operators.includes(char);
}

function isOperand(char){
  const number = Number(char);
  return number >= 0 && number <= 9;
}

function precedence(char){
  if(char == '*') {
    return 4;
  } else if(char == '/'){
    return 3;
  } else if(char == '+'){
    return 2;
  } else if(char == '-'){
    return 1;
  } else if(char == '(' || char == ')'){
    return 0;
  }
}

function process(operators, operands){
  const operator = operators.pop();
  let num2 = Number(operands.pop());
  let num1 = Number(operands.pop());
  let result = 0;

  if(operator == '*') {
    result = num1 * num2;

  } else if(operator == '/'){
    result = num1 / num2;

  } else if(operator == '+'){
    result = num1 + num2;

  } else if(operator == '-'){
    result = num1 - num2;
  }

  operands.push(result);
}

console.log(evaluate('(9+1+2)/(1+3*2)'));
console.log(evaluate('(9+1+8)/(1+3*2)'));