// This code snippet is part of a basic calculator application.
// It defines arithmetic functions and sets up event listeners for button clicks to perform calculations.

let currentInput = "";

const displayNums = document.getElementById("display");
const allBtns = document.querySelectorAll(".btn");

//// Prevent inputs like "05" by replacing leading zero unless the next character is a decimal point
function replaceLeadingZeros(value) {
  return currentInput === "0" && value !== ".";
}

//check if first input is any oeprator except minus
function isFirstInputOperator(value) {
  if (
    currentInput === "" &&
    ["+", "-", "/", "*"].includes(value) &&
    value !== "-"
  ) {
    return true;
  }
  return false;
}

function handleButtonClick(event) {
  const value = event.target.dataset.value;

  switch (value) {
    case "=":
      try {
        const calculateResult = Function(
          '"use strict"; return (' + currentInput + ")"
        )();
        displayNums.value = calculateResult;
        currentInput = calculateResult;

        // Handle Infinity or -Infinity results
        if (calculateResult === Infinity || calculateResult === -Infinity) {
          displayNums.value = "Error: Division by zero";
          currentInput = "";
        }
      } catch (error) {
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
      const replaceLeading = replaceLeadingZeros(value);
      const firstInputOperator = isFirstInputOperator(value);

      if (firstInputOperator) {
        return;
      }

      if (replaceLeading) {
        currentInput = value;
      } else {
        currentInput += value;
      }
      displayNums.value = currentInput; //Displays the current input and the result on the calculator.
      break;
  }
}

// Attach event listeners to all buttons
allBtns.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
