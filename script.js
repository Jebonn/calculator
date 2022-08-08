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

function parseFix(num) {
    return parseFloat(num);
}

function operate(operation) {
    let [a, b] = equation.split(operation);
    a = +a;
    b = +b;

    switch (operation) {
        case "+":
            display(parseFix(add(a, b)));
            break;
        case "-":
            display(parseFix(subtract(a, b)));
            break;
        case "x":
            display(parseFix(multiply(a, b)));
            break;
        case "/":
            if (b == 0) {
                display("Don't do that."); // In case of divide by zero
                break;
            }
            display(parseFix(divide(a, b)));
            break;
    }
    equation = numbersDisplay.value;
}

function clear() {
    display('');
}

function pi() {
    display(Math.PI.toFixed(4));
}

// Returns last character
function lastValue() {
    return equation.slice(-1);
}

// Returns true if equation variable has an operation symbol
function hasOperation() {
    return equation.match(/[-+/x]/);
}

// Adds a decimal point if there isn't one. Otherwise do nothing.
function decimalEntry() {
    if (!numbersDisplay.value.includes(".")) {
        equation += ".";
        display(numbersDisplay.value + ".");
    }
}

// Highlights if one of the +-x/ buttons were pressed
// Removes highlight from buttons not pressed or if CE or = buttons were pressed
function highlight(button) {
    operationButtons.forEach(operation => {
        if (button.textContent != operation.textContent || equation == '') {
            operation.style = "box-shadow: none;";
        } else if (button.textContent == operation.textContent) {
            operation.style = "box-shadow: 0px 0px 1px 2px blue;";
        }
    })
}

let activeOperation = '';   // Tracks current operation
let equation = '';          // Records equation

////QUERY SELECTORS////
const numbersDisplay = document.querySelector("#numbers-display");
const clearButton = document.querySelector("#clear-entry");
const equalButton = document.querySelector("#equal");
const piButton = document.querySelector("#pi");
const decimalButton = document.querySelector("#decimal");
const inverseButton = document.querySelector("#inverse");
const undoButton = document.querySelector("#undo");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");


////EVENT LISTENERS////
numberButtons.forEach(number => {
    number.addEventListener('click', () => {
        const buttonPress = number.textContent;

        if (numbersDisplay.value == "Don't do that.") { // Divide by zero reset
            clearButton.click();
        }

        if (lastValue().match(/[-+/x]/)) {
            display(buttonPress)
        } else if (lastValue() || equation == '') {
            display(numbersDisplay.value + buttonPress);
        } 
        equation += buttonPress;
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonPress = button.textContent;

        if (lastValue().match(/[0-9]/) && hasOperation()) {
            operate(activeOperation);
        } else if (lastValue().match(/[-+/x]/)){
            equation = equation.replace(/.$/, buttonPress);
        } else {
            equation += buttonPress;
        }
        activeOperation = buttonPress;
        highlight(button);
    })
})

equalButton.addEventListener('click', () => {
    if (lastValue().match(/[0-9]/) && hasOperation()) {
        operate(activeOperation);
        highlight(equalButton);
    }
})

clearButton.addEventListener('click', () => {
    equation = '';
    highlight(clearButton);
    clear();
});

inverseButton.addEventListener('click', () => {
    if (Number(numbersDisplay.value) > 0) {
        display("-" + numbersDisplay.value);
    } else if (Number(numbersDisplay.value) < 0) {
        display(numbersDisplay.value.slice(1));
    }
})

undoButton.addEventListener('click', () => {
    if (lastValue().match(/[0-9]/)){
        display(numbersDisplay.value.slice(0, -1));
    } else if (lastValue().match(/[-+/x]/)) {
        highlight(clearButton)
    }
    equation = equation.slice(0, -1);
})

piButton.addEventListener('click', pi);
decimalButton.addEventListener('click', decimalEntry);