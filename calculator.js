// constants
const lcdTop = document.querySelector("#lcd-top");
const lcdBottom = document.querySelector("#lcd-bottom");
const keys = document.querySelector("#keys");


console.log();

let temp;
let input;
let result;
let numA;
let numB;
let activeOperator;
let lastOperator;

// reset all variables to default
clear();
showInput();

// test area




// input
function inputNumber(s) {
    // prevent multiple dots
    if ([...temp].includes(".") && s == ".") return;
    // reset temp
    //if (input == 0) {temp = "0"}
    if (temp === "0" && s == ".") {
        temp = "0.";
    }
    else if (temp === "0") {
        temp = s;
    }
    else {
        temp += s;
    }
    // percentage go here?
    // +/- go here?
    input = parseFloat(temp);
}

// display
function showFormula(current, symbol) {
    if (current == null || symbol == "") return "";
    return `${current} ${symbol}`;
}

function showInput() {
    lcdBottom.textContent = temp;
}

function showResults() {
    // toFixed limits decimal places, parseFloat gets rid of trailing zeros
    lcdBottom.textContent = parseFloat(result.toFixed(6));
}

// clear
function clear() {
    temp = "0";
    input = 0;
    result = 0;
    numA = 0;
    numB = null;
    activeOperator = "";
    lastOperator = ""; 
    showInput();
}

// logic
function operate(operator, updateOperator = true) {
    
    if (numA == 0) {
        numA = input;
        input = 0;
        temp = "0";
        activeOperator = operator;
        return;
    }
    else {
        numB = input;
        if (activeOperator == "+") {
            result = add(numA, numB);
            showResults();
            updateNumbers();
        }
        if (activeOperator == "-") {
            result = subtract(numA, numB);
            showResults();
            updateNumbers();
        }
        if (activeOperator == "x") {
            result = multiply(numA, numB);
            showResults();
            updateNumbers();
        }
        if (activeOperator == "/") {
            result = divide(numA, numB);
            showResults();
            updateNumbers();
        }

        if (updateOperator) {
            activeOperator = operator;
        } else {
            activeOperator = "";
        }
    }
}

function updateNumbers() {
    numA = result;
    numB = null;
    input = 0;
    temp = "0";
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
        myHtml += `<div class="button" id="b${btn}" data-value="${numPad[btn]}">${numPad[btn]}</div>`;
        btn++;
    }
    myHtml += `</div>`;
}
//insert into container
keys.innerHTML += myHtml;



// interaction

keys.addEventListener("click", (e) => {
    const value = e.target.getAttribute("data-value");

    if (value == null) {}

    else if (/[0-9.]/.test(value)) {
        inputNumber(value);
        showInput();
    }
    else if (/[-+/x]/.test(value)) {
        operate(value);
    }
    else if (value == "=") {
        operate(value, false);
    }
    else if (value == "AC") {
        clear();
    }
    console.log({temp});
    console.log(typeof temp);
    console.log({input});
    console.log({numA});
    console.log({numB});
    console.log({result});
    console.log({activeOperator});

});

