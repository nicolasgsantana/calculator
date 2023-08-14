let firstNumber;
let operator;
let secondNumber;

const OPERATIONS = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
};


function operate(x, operator, y) {
    return OPERATIONS[operator](x, y);
}
