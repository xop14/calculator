// constants
const lcdTop = document.querySelector("#lcd-top");
const lcdBottom = document.querySelector("#lcd-bottom");
const keys = document.querySelector("#keys");
const MAXLENGTH = 14;


console.log();

let temp;
let input;
let result;
let numA;
let numB;
let activeOperator;
let lastOperator;
let pause;

// reset all variables to default
clear();
showInput();

// test area




// input
function inputNumber(s) {
    // prevent multiple dots
    if ([...temp].includes(".") && s == ".") return;
    if (temp.length >= 14) return;
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
    input = parseFloat(temp);
}

// display

function showInput() {
    if (temp.length >= 8) {
        lcdBottom.style.transition = "0.2s";
        lcdBottom.style.fontSize = "28px";
    } else {
        lcdBottom.style.fontSize = "48px";
    }
    lcdBottom.textContent = temp;
}

function showResults() {
    lcdBottom.style.transition = "0s";
    // Adjust max number of decimal places to fit screen
    const leftLength = result.toString().split(".")[0].length;
    let decimalPlaces = MAXLENGTH - leftLength - 1;
    decimalPlaces = decimalPlaces < 2 ? 2 : decimalPlaces;

    // toFixed limits decimal places, parseFloat gets rid of trailing zeros
    const formattedResult = parseFloat(result.toFixed(decimalPlaces));
    
    if (formattedResult.toString().length > 14) {
        lcdBottom.style.fontSize = "24px";
        lcdBottom.textContent = "Number too large!";
        pause = true;
    } 
    else if (formattedResult.toString().length > 8) {
        lcdBottom.style.fontSize = "28px";
        lcdBottom.textContent = formattedResult;
    }
    else {
        lcdBottom.style.fontSize = "48px";
        lcdBottom.textContent = formattedResult;
    }
}

function showFormula(clear = false, operator = activeOperator) {
    if (clear === true) {
        lcdTop.textContent = "";
        return;
    }
    lcdTop.textContent = `${numA} ${operator} ${numB == null ? "" : numB + " " + "="}`;
}

// clear
function clear() {
    temp = "0";
    input = null;
    result = 0;
    numA = null;
    numB = null;
    activeOperator = "";
    lastOperator = ""; 
    pause = false;
    showInput();
    showFormula(true);
}

// logic
function operate(operator) {
    logAll("start");
    if (input == null) {
        activeOperator = operator;
    }
    else if (numA == null) {
        // put current user input into numA
        numA = input;
        // reset current user input
        input = null;
        temp = "0";
        // set active operator
        activeOperator = operator;
        showFormula();
    }
    else {
        // only update b if there is an input availble
        if (input != null) {
            numB = input;
        }
        showFormula(false, operator);

        if (activeOperator == "+") {
            result = add(numA, numB);
            if (result != null) {
                showResults();
                updateNumbers();
            }
        }
        if (activeOperator == "-") {
            result = subtract(numA, numB);
            if (result != null) {
                showResults();
                updateNumbers();
            }
        }
        if (activeOperator == "x") {
            result = multiply(numA, numB);
            if (result != null) {
                showResults();
                updateNumbers();
            }
        }
        if (activeOperator == "/") {
            result = divide(numA, numB);
            if (result != null) {
                showResults();
                updateNumbers();
            }
        }
        activeOperator = operator;
    }
    logAll("end");
}

function updateNumbers() {
    numA = result;
    numB = null;
    input = null;
    temp = "0";
}


// operators
function add(a, b) {
    if (b == null) return;
    return a + b;
}
function subtract(a, b) {
    if (b == null) return;
    return a - b;
}

function multiply(a, b) {
    if (b == null) return;
    return a * b;
}

function divide(a, b) {
    if (b == null) return;
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
    else if (value == "AC") {
        clear();
    }
    else if (pause == true) {
        return;
    }
    else if (/[0-9.]/.test(value)) {
        inputNumber(value);
        showInput();
        // shows current sum and operator in formula bar if numA has a value
        if (numA != null) {
            showFormula(value);
        }
    }
    else if (/[-+/x]/.test(value)) {
        operate(value);
        // shows current sum and operator in formula bar if numA has a value
        if (numA != null) {
            showFormula(value);
        }
    }
    else if (value == "=") {
        if (numA == null) return;
        operate(activeOperator, false);
    }
    else if (value == "%") {
        logAll("%")
        let toConvert = input;
        if (input == null) {
            toConvert = result;
        }
        if (toConvert < 0.001) {
            lcdBottom.style.fontSize = "28px";
            lcdBottom.textContent = "Too small to convert";
            return;
        }
        input = toConvert / 100;
        temp = input.toString();
        showInput();
        console.log({input});
    }
    else if (value == "±") {
        input = input * -1;
        temp = input.toString();
        showInput();
    }

});


function logAll(position = "") {
    
    const logTable = {
        "POSITION": position,
        "temp": temp,
        "input": input,
        "numA": numA,
        "activeOperator": activeOperator,
        "numB": numB,
        "result": result,
    }
    console.table(logTable);
}