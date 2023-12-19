$(document).ready(function() {
  let displayVal = "0";
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
        } else if (numVal ==='0' || numVal ==='00') { 
          //何も行わない  
        } else {
          displayVal = numVal;
        }
      } else {
        if (numVal === '.' && displayVal.includes('.')) {
          //何も行わない  
        } else {
          displayVal += numVal;
        }
      }
    }
    if (isOperatorClicked) {
      if (numVal === '.' || numVal === '00') {
        //何も行わない  
      } else {
        displayVal = numVal;
        isOperatorClicked = false;
      }
    } 
    $('#display').text(displayVal);
  });

  $('.operator').on('click', function() {
    const currentOperator = $(this).val();

      if (operator !== null && !isOperatorClicked) {
        operand1 = calculate(operand1, parseFloat(displayVal), operator);
        displayVal = operand1.toString();
        $('#display').text(displayVal);
      } else {
        operand1 = parseFloat(displayVal);
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
      const operand2 = parseFloat(displayVal);
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