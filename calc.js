
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

console.log("add",add(2, 3)); // 5
console.log(subtract(5, 2)); // 3
console.log(multiply(4, 3)); // 12
console.log(divide(10, 2)); // 5
//module.exports = {
  //add,
  //subtract,
  //multiply,
 // divide
//};
// This module provides basic arithmetic operations: addition, subtraction, multiplication, and division.
// Each function takes two arguments and returns the result of the operation.
// Usage example:
// const calc = require('./calc');
// console.log(calc.add(2, 3)); // 5
// console.log(calc.subtract(5, 2)); // 3
// console.log(calc.multiply(4, 3)); // 12
// console.log(calc.divide(10, 2)); // 5
// Note: Division by zero will return Infinity in JavaScript, so handle it accordingly in your application.
// Ensure to validate inputs in a real application to avoid unexpected results.
// The module can be extended with more complex operations or error handling as needed.
// The module exports four functions: add, subtract, multiply, and divide.
// Each function can be imported and used in other JavaScript files as shown in the usage example

// This code snippet is part of a basic calculator application.
// It defines arithmetic functions and sets up event listeners for button clicks to perform calculations.

let currentInput = "";

// Safe mathematical expression evaluator
function evaluateExpression(expression) {
    // Remove all whitespace
    expression = expression.replace(/\s/g, '');
    
    // Only allow numbers, operators, parentheses, and decimal points
    if (!/^[0-9+\-*/.()]+$/.test(expression)) {
        return null;
    }
    
    // Prevent consecutive operators (except for negative numbers)
    if (/[+\-*/.]{2,}/.test(expression.replace(/\(-/g, '(0-'))) {
        return null;
    }
    
    // Prevent expressions ending with operators
    if (/[+\-*/.]$/.test(expression)) {
        return null;
    }
    
    // Check for balanced parentheses
    let parenthesesCount = 0;
    for (let char of expression) {
        if (char === '(') parenthesesCount++;
        if (char === ')') parenthesesCount--;
        if (parenthesesCount < 0) return null;
    }
    if (parenthesesCount !== 0) return null;
    
    try {
        // Use a simple recursive descent parser for safety
        return parseExpression(expression);
    } catch (error) {
        return null;
    }
}

// Simple recursive descent parser for mathematical expressions
function parseExpression(expr) {
    let index = 0;
    
    function parseNumber() {
        let num = '';
        while (index < expr.length && /[0-9.]/.test(expr[index])) {
            num += expr[index++];
        }
        const result = parseFloat(num);
        if (isNaN(result)) {
            throw new Error('Invalid number');
        }
        return result;
    }
    
    function parseFactor() {
        if (expr[index] === '(') {
            index++; // skip '('
            const result = parseAddSub();
            index++; // skip ')'
            return result;
        } else if (expr[index] === '-') {
            index++; // skip '-'
            return -parseFactor();
        } else {
            return parseNumber();
        }
    }
    
    function parseMulDiv() {
        let result = parseFactor();
        while (index < expr.length && /[*/]/.test(expr[index])) {
            const op = expr[index++];
            const right = parseFactor();
            if (op === '*') {
                result *= right;
            } else {
                if (right === 0) return Infinity;
                result /= right;
            }
        }
        return result;
    }
    
    function parseAddSub() {
        let result = parseMulDiv();
        while (index < expr.length && /[+-]/.test(expr[index])) {
            const op = expr[index++];
            const right = parseMulDiv();
            if (op === '+') {
                result += right;
            } else {
                result -= right;
            }
        }
        return result;
    }
    
    const result = parseAddSub();
    if (index !== expr.length) {
        throw new Error('Invalid expression');
    }
    return result;
}

const displayNums = document.getElementById("display");
const allBtns = document.querySelectorAll(".btn");
//let dataValue=button.dataset.value;
console.log("Current input" ,currentInput);


allBtns.forEach(button => {
    button.addEventListener("click", function(event) {
        const value=event.target.dataset.value;
        console.log("Button clicked:", value);
       
        //Let catch error division zero
    
    
        switch (value) {
           case "=":
            try {
                // Safe mathematical expression evaluation
                const result = evaluateExpression(currentInput);
                if (result === null) {
                    displayNums.value = "Error: Invalid expression";
                    currentInput = "";
                } else if (result === Infinity || result === -Infinity) {
                    displayNums.value = "Error: Division by zero";
                    currentInput = "";
                } else {
                    displayNums.value = result;
                    currentInput = result.toString();
                    console.log("Result", result);
                }
            }
             catch (error) {
                console.error("Error evaluating expression:", error);
                displayNums.value = "Error: Invalid expression";
                currentInput = "";
            }
            break;


           case "AC":
            currentInput = "";
            displayNums.value = "";
            break;


           case "DEL":
            currentInput = currentInput.slice(0, -1);
            displayNums.value = currentInput;
            break;
              
          default:
            // Prevent multiple decimal points in the same number
            if (value === ".") {
                // Check if current number already has a decimal point
                const lastNumberMatch = currentInput.match(/[0-9.]*$/);
                if (lastNumberMatch && lastNumberMatch[0].includes(".")) {
                    // Current number already has a decimal point, ignore this one
                    break;
                }
                // Also prevent starting with a decimal point after an operator
                if (currentInput === "" || /[+\-*/]$/.test(currentInput)) {
                    currentInput += "0.";
                } else {
                    currentInput += value;
                }
            } else if (/[+\-*/]/.test(value)) {
                // Handle operators with validation
                if (currentInput === "") {
                    // Only allow minus sign at the beginning for negative numbers
                    if (value === "-") {
                        currentInput += value;
                    }
                    // Ignore other operators at the beginning
                } else if (/[+\-*/]$/.test(currentInput)) {
                    // Replace the last operator if user enters a different one
                    // This allows users to correct their operator choice
                    currentInput = currentInput.slice(0, -1) + value;
                } else {
                    // Valid operator placement
                    currentInput += value;
                }
            } else {
                // Handle numbers
                currentInput += value;
            }
            displayNums.value = currentInput;
            console.log("Current input" ,currentInput);
            break;
    }
          
    });
});