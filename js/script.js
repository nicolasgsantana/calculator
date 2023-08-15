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

function clickNumberBtn(key) {
    let btn = numberBtns.reduce((searchedBtn, btn) => {
        if (btn.value === key) {
            searchedBtn = btn;
            return searchedBtn;
        }
    }, null);
    if (btn !== null) {
        btn.click();
    }
}

function clickOperationBtn(key) {
    let btn = operationBtns.reduce((searchedBtn, btn) => {
        if (btn.value === key) {
            searchedBtn = btn;
            return searchedBtn;
        }
    }, null);
    if (btn !== null) {
        btn.click();
    }
}


numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (operator === "" && result === "") {
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
        toggleDotBtn();
        updateDisplay();
    });
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

        firstNumber = result;
        operator = "";
        secondNumber = "";

        toggleDotBtn();
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
            clickNumberBtn(e.key);
            break;
        case ('1'):
            clickNumberBtn(e.key);
            break;
        case ('2'):
            clickNumberBtn(e.key);
            break;
        case ('3'):
            clickNumberBtn(e.key);
            break;
        case ('4'):
            clickNumberBtn(e.key);
            break;
        case ('5'):
            clickNumberBtn(e.key);
            break;
        case ('6'):
            clickNumberBtn(e.key);
            break;
        case ('7'):
            clickNumberBtn(e.key);
            break;
        case ('8'):
            clickNumberBtn(e.key);
            break;
        case ('9'):
            clickNumberBtn(e.key);
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
            clickOperationBtn(e.key);
            break;
        case ('-'):
            clickOperationBtn(e.key);
            break;
        case ('*'):
            clickOperationBtn(e.key);
            break;
        case ('/'):
            clickOperationBtn(e.key);
            break;
    }
});