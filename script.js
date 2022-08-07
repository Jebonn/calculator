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

const numbersDisplay = document.querySelector("#numbers-display");

const clearButton = document.querySelector("#clear-entry");
clearButton.addEventListener('click', clear);

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(number => {
    number.addEventListener('click', entry);
})