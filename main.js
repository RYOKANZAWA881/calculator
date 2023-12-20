$(document).ready(function() {
  let displayVal = "0";
  let checkDecimal = "0";
  let operand1 = null;
  let operator = null;
  let isOperatorClicked = false;

  $('#display').text(displayVal);

  $('.number').on('click', function() {
    const numVal = $(this).val();

    if (!isOperatorClicked) {
      if (displayVal === '0') {
        if (numVal === '.') {
          displayVal += numVal;
          checkDecimal += numVal;
        } else if (numVal === '0' || numVal === '00') {
          // 何も行わない
        } else {
          displayVal = numVal;
          checkDecimal = numVal;
        }
      } else {
        if (numVal === '.' && checkDecimal.includes('.')) {
          // 何も行わない
        } else {
          displayVal += numVal;
          checkDecimal += numVal;
        }
      }
    } else {
        checkDecimal = "0";
        if (numVal === '.' || numVal === '00') {
          // 何も行わない
        } else {
          displayVal += numVal;
          isOperatorClicked = false;
        }
    }
    $('#display').text(displayVal);
  });

  $('.operator').on('click', function() {
    const currentOperator = $(this).val();

    if (operand1 !== null && !isOperatorClicked) {
      displayVal += currentOperator;
      $('#display').text(displayVal);    
      operand1 = calculate(operand1, parseFloat(displayVal.slice(displayVal.indexOf(operator) + 1)), operator);
      displayVal = operand1.toString() + currentOperator;
      $('#display').text(displayVal);
    } else if (operand1 !== null && isOperatorClicked) {
      displayVal = displayVal.slice(0, -1) + currentOperator;
      $('#display').text(displayVal);
    } else {
      operand1 = parseFloat(displayVal);
      displayVal += currentOperator;
      $('#display').text(displayVal);
    }
    
    operator = currentOperator;
    isOperatorClicked = true;
  });

  $('#clear').on('click', function() {
    displayVal = "0";
    operand1 = null;
    operator = null;
    isOperatorClicked = false;
    $('#display').text(displayVal);
  });

  $('#calculate').on('click', function() {
    if (operator !== null) {
      const operand2 = parseFloat(displayVal.slice(displayVal.indexOf(operator) + 1));
      displayVal = operand1.toString() + operator + operand2.toString();
      displayVal = calculate(operand1, operand2, operator).toString();
      $('#display').text(displayVal);
      operand1 = null;
      operator = null;
      isOperatorClicked = true;
    }
  });

  function calculate(num1, num2, operator) {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        return null;
    }
  }
});