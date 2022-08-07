function display(toDisplay) {
    numbersDisplay.value = toDisplay;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operation, a, b) {
    switch (operation) {
        case "+":
            display(add(a, b));
            break;
        case "-":
            display(subtract(a, b));
            break;
        case "x":
            display(multiply(a, b));
            break;
        case "/":
            display(divide(a, b));
            break;
    }
}

function clear() {
    display('');
}

function pi() {
    display(Math.PI);
}

function entry() {
    display(numbersDisplay.value + this.textContent);
}

// Iterates through operationButtons NodeList
// Highlights the arithmatic button that was pressed
// Removes highlight from button not pressed
function highlight() {
    operationButtons.forEach(operation => {
        if (currentOperation != operation.textContent) {
            operation.style = "box-shadow: none;";
        } else if (currentOperation == operation.textContent) {
            operation.style = "box-shadow: 0px 0px 1px 2px blue;";
        }
    })
}

let previousNum;
let currentOperation = '';

const numbersDisplay = document.querySelector("#numbers-display");
const clearButton = document.querySelector("#clear-entry");
const equalButton = document.querySelector("#equal");
const piButton = document.querySelector("#pi");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");

numberButtons.forEach(number => {
    number.addEventListener('click', entry);
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentOperation = button.textContent;
        highlight(); // highlights current operation button
    })
})

equalButton.addEventListener('click', () => {
    currentOperation = '';
    highlight(); // removes highlight from operation buttons
})

clearButton.addEventListener('click', clear);
piButton.addEventListener('click', pi);

