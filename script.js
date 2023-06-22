function add(value, value1)
{
    return Number(value) + Number(value1);
}

function subtract(value, value1)
{
    return Number(value) - Number(value1);
}

function multiply(value, value1)
{
    return Number(value) * Number(value1);
}

function divide(value, value1)
{
    return Number(value) / Number(value1);
}

function operate(value, value1, operation)
{
    switch (operation)
    {
        case "+": return add(value, value1);
        case "-": return subtract(value, value1);
        case "/": return divide(value, value1);
        case "*": return multiply(value, value1);
    }
}

function evaluate()
{
    if (display.charAt(display.length - 1) === " " || display === ""){ return; }

    for (let i = numbers.length - 2; i >= 0; i--)
    {
        if (operations[i] === "/" || operations[i] === "*")
        {
            numbers[i] = String(operate(numbers[i], numbers[i + 1], operations[i]));
            operations.splice(i, 1);
            numbers.splice(i + 1, i + 1);
        }
    }

    for (let i = numbers.length - 2; i >= 0; i--)
    {
        if (operations[i] === "+" || operations[i] === "-")
        {
            numbers[i] = String(operate(numbers[i], numbers[i + 1], operations[i]));
            operations.splice(i, 1);
            numbers.splice(i + 1, i + 1);
        }
    }

    operations = [];
    display = "";
    updateDisplay(numbers[0]);

}

function updateDisplay(add)
{
    display += add;
    displayElement.textContent = display;
}

function processNumber(num)
{
    numbers[0] += num;
    updateDisplay(num);
}

function processOperator(op)
{
    if (display.charAt(display.length - 1) !== " " && display !== "")
    {
        operations.unshift(op);
        numbers.unshift("");

        updateDisplay(" " + op + " ");
    }
}

function clear()
{
    displayElement.textContent = "";
    display = "";
    numbers = [""];
    operations = [];
}

function processButton(className, id)
{
    switch (id)
    {
        case "num": processNumber(className); return;
        case "opr": processOperator(className); return;
        case "clear": clear(); return;
        case "operate": evaluate(); return;
    }
}

let operations = [];
let numbers = [""];
let display = "";

const displayElement = document.querySelector(".display");
const buttons = document.querySelectorAll('button');

buttons.forEach(btn => 
{
    btn.addEventListener('click', event => 
    {
        processButton(event.target.className, event.target.id);
    })
})