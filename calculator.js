// constants
const lcdTop = document.querySelector("#lcd-top");
const lcdBottom = document.querySelector("#lcd-bottom");
const keys = document.querySelector("#keys");


console.log();

let temp;
let currentNum;
let lastNum;
let activeOperator;
let lastOperator;

// reset all variables to default
clear();
updateScreen(currentNum);


// test area
operate("multiply", 5, 6);



// input
function inputNumber(s) {
    temp += s;
    console.log(temp);
    // percentage go here?
    // +/- go here?
    currentNum = parseFloat(temp);
}

// display
function showFormula(current, symbol) {
    if (current == null || symbol == "") return "";
    return `${current} ${symbol}`;
}

function updateScreen() {
    if (currentNum == null) {
        //update screen with "0"
    } else {
        //update screen div with current number
    }
}

// clear
function clear() {
    temp = "";
    currentNum = null;
    lastNum = null;
    activeOperator = "";
    lastOperator = "";
}

// logic
function operate(operator, current = null, updateOperator = true) {
    if (lastNum == null && current == null) {
        return;
    } 
    else if (lastNum == null) {
        lastNum = current;
        currentNum = null;
        activeOperator = operator;
        return;
    } else {
        if (activeOperator == "+") {
            currentNum = add(lastNum, current, updateOperator);
            wrapUpOperation(operator);
            return;
        }
        if (activeOperator == "-") {
            currentNum = subtract(lastNum, current, updateOperator);
            wrapUpOperation(operator);
            return;
        }
        if (activeOperator == "x") {
            currentNum = multiply(lastNum, current, updateOperator);
            wrapUpOperation(operator);
            return;
        }
        if (activeOperator == "/") {
            currentNum = divide(lastNum, current, updateOperator);
            wrapUpOperation(operator);
            return;
        }
    }
}

function wrapUpOperation(operator, updateOperator) {
    lastNum = null;
    if (updateOperator == true) {
        lastOperator = activeOperator;
        activeOperator = operator;
    } else {
        activeOperator = "";
    }
    showFormula(currentNum, operator);
    updateScreen();
}

function equals() {
    operate(activeOperator, currentNum, false);
}


// operators
function add(a, b) {
    console.log(a + b);
    return a + b;
}
function subtract(a, b) {
    console.log(a - b);
    return a - b;
}

function multiply(a, b) {
    console.log(a * b);
    return a * b;
}

function divide(a, b) {
    console.log(a / b);
    return a / b;
}

function convertPercentage(a) {
    console.log(a / 100);
    return a / 100;
}

function convertToNegative(a) {
    console.log(a * -1);
    return a * -1;
}



// visuals

let numPad = [
    `AC`,
    `±`,
    `%`,
    `/`,
    `7`,
    `8`,
    `9`,
    `x`,
    `4`,
    `5`,
    `6`,
    `-`,
    `1`,
    `2`,
    `3`,
    `+`,
    `0`,
    `0`,
    `.`,
    `=`
]

//make 5 rows - make whole string first, then insert later
let btn = 0;
let myHtml = "";
for (let i = 0; i < 5; i++) {
    myHtml += `<div class="button-row">`;
    //fill with 4 buttons per row
    for (let j = 0; j < 4; j++) {
        myHtml += `<div class="button" id="b${btn}" value="${numPad[btn]}">${numPad[btn]}</div>`;
        btn++;
    }
    myHtml += `</div>`;
}
//insert into container
keys.innerHTML += myHtml;



// interaction

keys.addEventListener("click", (e) => {
    console.log(e.target);
});

