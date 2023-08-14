let firstNumber = "";
let operator = "";
let secondNumber = "";
let result = "";

let equationText = "";
let resultText = "";

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

const resultDisplay = document.getElementById("result-display");
const equationDisplay = document.getElementById("equation-display");


function operate(x, operator, y) {
    return OPERATIONS[operator](x, y);
}

function clear() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    result = "";
    equationText = "0";
    updateDisplay();
}

function updateDisplay() {
    equationDisplay.textContent = equationText;
    resultDisplay.textContent = resultText;
}

function getResult() {
    result = operate(+firstNumber, operator, +secondNumber);
}

function getOperatorSymbol(operator) {
    switch (operator) {
        case "*":
            return "x"
        case "/":
            return "÷"
        default:
            return operator;
    }
}


numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (operator === "") {
            firstNumber += btn.value;
            resultText = `${firstNumber}`;
        }
        else if (operator !== "") {
            secondNumber += btn.value;
            equationText = `${firstNumber} ${getOperatorSymbol(operator)}`;
            resultText = `${secondNumber}`;
        }

        updateDisplay();
    });
});

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (firstNumber !== "" && operator === "") {
            operator = btn.value;
            equationText = `${firstNumber} ${getOperatorSymbol(operator)}`;
            resultText = "";
        }

        else if (secondNumber === "") {
            operator = btn.value;
            equationText = `${firstNumber} ${getOperatorSymbol(operator)}`;
        }

        else if (operator !== "" && secondNumber !== "") {
            getResult();
            firstNumber = result;
            secondNumber = "";
            operator = btn.value;
            equationText = `${firstNumber} ${getOperatorSymbol(operator)}`;
            resultText = "";
        }

        updateDisplay();
    });
});

clearBtn.addEventListener('click', clear);

equalsBtn.addEventListener('click', () => {
    if (secondNumber !== "") {
        getResult();

        equationText = equationText = `${firstNumber} ${getOperatorSymbol(operator)} ${secondNumber}`;
        resultText = result;

        firstNumber = result;
        secondNumber = "";
        updateDisplay();
    }
});