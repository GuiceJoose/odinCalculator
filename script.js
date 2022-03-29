let screen = document.querySelector('.screen');
screen.textContent = 0;

let num1 = '';
let num2 = null;
let operator = null;
let opPressed = false;
let eqPressed = false;

let equalButton = document.querySelector('._equals');
let clearButton = document.querySelector('._clear');
let decButton = document.querySelector('._decimal');
let backButton = document.querySelector('.backspace');
let factButton = document.querySelector('._fact');
let plusMinusButton = document.querySelector('._plusMinus')

plusMinusButton.addEventListener('click', () => plusMinus());

factButton.addEventListener('click', () => fact())

backButton.addEventListener('click', () => backSpace());

decButton.addEventListener('click', () => appendDec());

clearButton.addEventListener('click', () => {
    screen.textContent = 0;
    num1 = '';
    num2 = '';
    operator = null;
})

equalButton.addEventListener('click', () => equals());

let numButtons = document.querySelectorAll('[data-number]');
let opButtons = document.querySelectorAll('[data-operator]');


numButtons.forEach(numButton => {
    numButton.addEventListener('click', () => appendNumber(numButton.textContent))
})

opButtons.forEach(opButton => {
    opButton.addEventListener('click', () => {
        if (operator != null && opPressed && eqPressed) {return;}
        else if (operator != null) {
        equals ();
        operator = opButton.textContent;
        num1 = screen.textContent;
        opPressed = true;
        num2 = null;
        }
        else {
        opPressed = true;
        num1 = screen.textContent;
        operator = opButton.textContent;
        }
})})


function appendNumber (number) {
    if (screen.textContent === '0') {
        screen.textContent = number;
    } else if (eqPressed) {
        eqPressed = false;
        screen.textContent = number;
    } else if (opPressed) {
        eqPressed = false
        opPressed = false;
        screen.textContent = number;
    } else {
        eqPressed = false;
        screen.textContent += number;
    }
}


function equals() {
    if (operator == null) {return}
    else {
    num2 = screen.textContent;
    screen.textContent = Math.round((operate(operator, +num1, +num2)*1000))/1000;
    operator = null;
    opPressed = false;
    eqPressed = true;
    }
}

function appendDec() {
    if (screen.textContent.includes('.')) {return;}
    else if (eqPressed) {
        eqPressed = false;
        screen.textContent = '0.';
    } else if (opPressed) {
        opPressed = false;
        screen.textContent = '0.';
    } else {
        screen.textContent += '.';
    }
}

function plusMinus() {
    if (screen.textContent.includes('-')) {
        screen.textContent = screen.textContent.replace('-','')
    }
    else {
        screen.textContent = '-' + screen.textContent;
    }
    
}

function backSpace() {
    screen.textContent = screen.textContent.slice(0,-1);
}

function fact() {
    num1 = screen.textContent;
    screen.textContent = factorial(num1);
    operator = null;
    opPressed = false;
    eqPressed = true;
}

function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function exp (num1, num2) {
    return num1 ** num2;
}

function factorial (num1) {
    if (num1==0) {
        return 1; 
    } else if (num1<0) {
        return 'error';
    } else {
        return num1 * factorial(num1-1);
    }
}

function operate (op, n1, n2) {
    if (op == '÷' && n2 == 0) {
        return 'No divide by 0!';
    }
    switch (op) {
        case '+':
            return add(n1, n2);
            break;
        case '-':
            return subtract(n1, n2);
            break;
        case 'X':
            return multiply(n1, n2);
            break;
        case '÷':
            return divide(n1, n2);
            break;
        case 'x^':
            return exp(n1, n2);
            break;
    }
}
