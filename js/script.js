let firstNumber = "";
let operator = "";
let secondNumber = "";
let displayText = "0";

const OPERATIONS = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
};

const numberBtns = Array.from(document.getElementsByClassName("number"));
const operationBtns = Array.from(document.getElementsByClassName("operation"));
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const display = document.getElementById("display");


function operate(x, operator, y) {
    return OPERATIONS[operator](x, y);
}

function clear() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    displayText = "0";
    updateDisplay();
}

function updateDisplay() {
    display.textContent = displayText;
}

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (firstNumber === "" && operator === "") {
            firstNumber = btn.value;
            displayText = `${firstNumber}`;
        }
        else if (secondNumber === "" && operator !== "") {
            secondNumber = btn.value;
            displayText = `${firstNumber} ${operator} ${secondNumber}`;
        }

        updateDisplay();
    });
});

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (firstNumber !== "" && operator === "") {
            operator = btn.value;
            displayText = `${firstNumber} ${operator}`;
        }

        updateDisplay();
    });
});

clearBtn.addEventListener('click', clear);

equalsBtn.addEventListener('click', () => {
    const result = operate(+firstNumber, operator, +secondNumber);
    displayText = result;
    updateDisplay();
});