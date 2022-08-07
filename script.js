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
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function clear() {
    numbersDisplay.value = '';
}

function entry() {
    numbersDisplay.value += this.textContent;
}

function highlight(button) {
    operationButtons.forEach(operation => {
        if (button != operation) {
            operation.style = "box-shadow: none;";
        } else if (button == operation) {
            button.style = "box-shadow: 0px 0px 1px 2px blue;";
        }
    })
}

const numbersDisplay = document.querySelector("#numbers-display");
const clearButton = document.querySelector("#clear-entry");
const equalButton = document.querySelector("#equal");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");

numberButtons.forEach(number => {
    number.addEventListener('click', entry);
})

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        highlight(operation); // highlights current operation button
    })
})

equalButton.addEventListener('click', () => {
    highlight(equalButton); // removes highlight from operation buttons
})

clearButton.addEventListener('click', clear);

