
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
                const result = Function('"use strict"; return (' + currentInput + ')')();
                displayNums.value = result;
                currentInput = result.toString();
                 console.log("Result", result);
                // Check for division by zero
                  if (currentInput.includes("/0")) {
                     displayNums.value = "Error: Division by zero";
                     currentInput = "";
                    }
                  
                  // Handle Infinity or -Infinity results
                if (result === Infinity || result === -Infinity) {
                     displayNums.value = "Error: Division by zero";
                  }           
                  
                else {
                       displayNums.value = result;
                      }
                      
            }
             catch (error) {
                console.error("Error evaluating expression:", error);
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
            currentInput += value;
            displayNums.value = currentInput;
            console.log("Current input" ,currentInput);
            break;
    }
          
    });
});