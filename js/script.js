let firstNumber = "";
let operator = "";
let secondNumber = "";
let result = "";

let equationText = "";
let resultText = "";

let alreadyHasDot = false;

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
const dotBtn = document.getElementById("dot");
const backspaceBtn = document.getElementById("backspace");

const resultDisplay = document.getElementById("result-display");
const equationDisplay = document.getElementById("equation-display");


function operate(x, operator, y) {
    return Math.round((OPERATIONS[operator](x, y) + Number.EPSILON) * 100) / 100;
}

function clear() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    result = "";
    resultText = "0";
    equationText = "";
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

function toggleDotBtn() {
    alreadyHasDot = alreadyHasDot ? false : true;
}

function addNumber(value) {
    if (operator === "" && result === "") {
        if (firstNumber.length < 16) {
            firstNumber += value;
        }
        resultText = `${firstNumber}`;
    }
    else if (operator !== "") {
        if (secondNumber.length < 16) {
            secondNumber += value;
        }
        equationText = `${firstNumber} ${getOperatorSymbol(operator)}`;
        resultText = `${secondNumber}`;
    }

    updateDisplay();
}

function addOperator(value) {
    if (firstNumber !== "" && operator === "") {
        operator = value;
        equationText = `${firstNumber} ${getOperatorSymbol(operator)}`;
        resultText = "";
    }

    else if (secondNumber === "" && firstNumber !== "") {
        operator = value;
        equationText = `${firstNumber} ${getOperatorSymbol(operator)}`;
    }

    else if (operator !== "" && secondNumber !== "") {
        getResult();
        firstNumber = result;
        secondNumber = "";
        operator = value;
        equationText = `${firstNumber} ${getOperatorSymbol(operator)}`;
        resultText = "";
    }

    if (alreadyHasDot) {
        toggleDotBtn();
    }

    updateDisplay();
}


numberBtns.forEach(btn => {
    btn.addEventListener('click', () => addNumber(btn.value));
});

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => addOperator(btn.value));
});

dotBtn.addEventListener('click', () => {

    if (!alreadyHasDot) {
        if (operator === "" && result === "") {
            if (firstNumber === "") {
                firstNumber = "0.";
            }
            else {
                firstNumber += ".";
            }
            resultText = `${firstNumber}`;
            updateDisplay();
            toggleDotBtn();
        }

        else if (operator !== "") {
            if (secondNumber === "") {
                secondNumber = "0.";
            }
            else {
                secondNumber += ".";
            }
            equationText = `${firstNumber} ${getOperatorSymbol(operator)}`;
            resultText = `${secondNumber}`;
            updateDisplay();
            toggleDotBtn();
        }
    }
});

clearBtn.addEventListener('click', clear);

equalsBtn.addEventListener('click', () => {
    if (secondNumber !== "") {
        getResult();

        equationText = equationText = `${firstNumber} ${getOperatorSymbol(operator)} ${secondNumber}`;
        resultText = result;

        if (equationText.length > 28) {
            equationText = "";
        }

        if (resultText.toString().length >= 16) {
            equationText = "";
            resultText = "err char limit";
        }

        if (secondNumber.toString().includes(".")) {
            toggleDotBtn();
        }

        if (typeof (resultText) === 'number') {
            firstNumber = result;
        }
        else {
            firstNumber = "";
        }
        operator = "";
        secondNumber = "";

        updateDisplay();
    }
});

backspaceBtn.addEventListener('click', () => {
    if (operator === "" && result === "" && firstNumber !== "") {

        let splittedStr = firstNumber.split("");

        if (splittedStr[splittedStr.length - 1] === ".") {
            toggleDotBtn();
        }

        splittedStr.pop();
        firstNumber = splittedStr.join("");

        resultText = `${firstNumber}`;
        updateDisplay();
    }

    else if (operator !== "" && secondNumber !== "") {
        let splittedStr = secondNumber.split("");

        if (splittedStr[splittedStr.length - 1] === ".") {
            toggleDotBtn();
        }

        splittedStr.pop();
        secondNumber = splittedStr.join("");

        resultText = `${secondNumber}`;
        updateDisplay();
    }
});

document.addEventListener('keydown', e => {
    switch (e.key) {
        case ('0'):
            addNumber(e.key);
            break;
        case ('1'):
            addNumber(e.key);
            break;
        case ('2'):
            addNumber(e.key);
            break;
        case ('3'):
            addNumber(e.key);
            break;
        case ('4'):
            addNumber(e.key);
            break;
        case ('5'):
            addNumber(e.key);
            break;
        case ('6'):
            addNumber(e.key);
            break;
        case ('7'):
            addNumber(e.key);
            break;
        case ('8'):
            addNumber(e.key);
            break;
        case ('9'):
            addNumber(e.key);
            break;
        case ('Backspace'):
            backspaceBtn.click();
            break;
        case ('c'):
            clearBtn.click();
            break;
        case ('='):
            equalsBtn.click();
            break;
        case ('.'):
            dotBtn.click();
            break;
        case ('+'):
            addOperator(e.key);
            break;
        case ('-'):
            addOperator(e.key);
            break;
        case ('*'):
            addOperator(e.key);
            break;
        case ('/'):
            addOperator(e.key);
            break;
    }
});
