const currentDisplayNumber = document.querySelector('#lower-screen');
const previousDisplayNumber = document.querySelector('#upper-screen');

const equal = document.querySelector("#equal");
equal.addEventListener('click', () => {
    if(currentNum != '' && previousNum != '') {
        calculate();
    }
})

const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', () => {
    addDecimal()
})

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearCalc);

const undo = document.querySelector('#backspace');
undo.addEventListener('click', deleteInput);

const numberButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');

let currentNum = ''
let previousNum = ''
let operator = ''


numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        inputNumber(e.target.value)
    })
})

function inputNumber(number) {
    if(previousNum !== '' && currentNum === '' && operator === '') {
        previousNum = '';
        currentDisplayNumber.textContent = currentNum;
    }
    if(currentNum.length <= 11) {
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
    }
}

operatorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        inputOperator(e.target.textContent)
    })
})

function inputOperator(operatorInput) {
    if(currentNum === '' && previousNum === '') return;
    if(previousNum === '') {
        previousNum = currentNum;
        operatorCheck(operatorInput);
    }
    else if(currentNum === '') {
        operatorCheck(operatorInput);
    } else {
        calculate();
        operator = operatorInput;
        previousDisplayNumber.textContent = `${previousNum} ${operator}`;
        currentDisplayNumber.textContent = ''
    }
}

function operatorCheck(textContent) {
    operator = textContent;
    previousDisplayNumber.textContent = `${previousNum} ${operator}`;
    currentNum = ''
    currentDisplayNumber.textContent = ''
}

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if(operator === '+') {
        previousNum = previousNum + currentNum;
    }
    else if(operator === '-') {
        previousNum = previousNum - currentNum;
    }
    else if(operator === 'x') {
        previousNum = previousNum * currentNum;
    }
    else if(operator === '÷') {
        if(currentNum <= 0) {
            previousNum = 'ERROR'
            displayResult();
            return;
        }
        previousNum = previousNum / currentNum
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResult();
}

function roundNumber(number) {
    return Math.round(number * 100000) / 100000;
}

function displayResult() {
    if (previousNum.length <= 11) {
        currentDisplayNumber.textContent = previousNum;
    } else {
        currentDisplayNumber.textContent = previousNum.slice(0, 11) + '...';
    }
previousDisplayNumber.textContent = '';
operator = '';
currentNum = '';
}

function clearCalc() {
    currentNum = '';
    previousNum = '';
    operator = '';
    currentDisplayNumber.textContent = '';
    previousDisplayNumber.textContent = '';
}

function addDecimal() {
    if(!currentNum.includes('.')) {
        currentNum += '.';
        currentDisplayNumber.textContent = currentNum;
    }
}

function deleteInput() { 
    currentDisplayNumber.textContent = currentDisplayNumber.textContent.slice(0, currentDisplayNumber.textContent.length - 1);
    currentNum = currentNum.slice(0, currentNum.length - 1);
}

// adding functionality for keyboard input 

window.addEventListener('keydown', keyboardInput);

function keyboardInput(e) {
    e.preventDefault();
    if(e.key >= 0 && e.key <=9) {
        inputNumber(e.key);
    }
    else if(e.key === '+' || e.key === '-') {
        inputOperator(e.key);
    }
    else if(e.key === '/') {
        inputOperator('÷');
    }
    else if(e.key === '*') {
        inputOperator('x');
    }
    else if(e.key === '=') {
        calculate();
    }
    else if(e.keyCode === 8) {
        deleteInput();
    }
}

