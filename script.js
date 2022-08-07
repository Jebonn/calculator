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
    a = +a;
    b = +b;
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
    display(Math.PI.toFixed(15));
}

// Adds pressed number to the display
// Clears screen if gettingNewEntry is true. Caused by pressing
// one of the +-x/ or = buttons, then sets it back to false
function entry() {
    if (gettingNewEntry) {
        gettingNewEntry = false;
        clear();
    }
    if (numbersDisplay.value.length <= 16) {
        display(numbersDisplay.value + this.textContent);
    }
}

// Adds a decimal point if there isn't one. Otherwise do nothing.
function decimalEntry() {
    if (!numbersDisplay.value.includes(".")) {
        display(numbersDisplay.value + this.textContent);
    }
}

// Iterates through operationButtons NodeList
// Highlights the arithmatic button that was pressed
// Removes highlight from button not pressed or if CE or = buttons are pressed
function highlight() {
    operationButtons.forEach(operation => {
        if (currentOperation != operation.textContent) {
            operation.style = "box-shadow: none;";
        } else if (currentOperation == operation.textContent) {
            operation.style = "box-shadow: 0px 0px 1px 2px blue;";
        }
    })
}

let currentOperation;           // Records current arithmatic operation
let gettingNewEntry = false;    // True after pressing one of the +-x/ buttons
let previousNum;                // Records previous numbers in display

// QUERY SELECTORS
const numbersDisplay = document.querySelector("#numbers-display");
const clearButton = document.querySelector("#clear-entry");
const equalButton = document.querySelector("#equal");
const piButton = document.querySelector("#pi");
const decimalButton = document.querySelector("#decimal");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");

// EVENT LISTENERS
numberButtons.forEach(number => {
    number.addEventListener('click', entry);
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // If an operation button was previously pressed, display the
        // calculation before replacing it with the current operation
        if (currentOperation != '') {
            operate(currentOperation, previousNum, numbersDisplay.value);
        }
        currentOperation = button.textContent;
        gettingNewEntry = true; 
        previousNum = numbersDisplay.value;
        highlight();
    })
})

equalButton.addEventListener('click', () => {
    operate(currentOperation, previousNum, numbersDisplay.value);
    currentOperation = '';
    gettingNewEntry = true;
    highlight();
})

clearButton.addEventListener('click', () => {
    currentOperation = '';
    highlight();
    clear();
});

piButton.addEventListener('click', pi);
decimalButton.addEventListener('click', decimalEntry);

