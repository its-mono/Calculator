var displayStr = '0';
var ifFirst = 1;

//opeator signal sender
// 1 -- add
// 2 -- sub
// 3 -- multiply
// 4 -- divison
function checkOp(theOp) {
    switch (theOp) {
        case '+':
            return 1; break;
        case '-':
            return 2; break;
        case 'x':
            return 3; break;
        case '/':
            return 4; break;
        default:
            return 0; break;
    }
}
//performing action against input
function input(char) {
    let isOp = checkOp(displayStr.slice(-1));
    if (ifFirst) {
        displayStr = ''; displayWindow();
        ifFirst = 0;
        if (checkOp(char)) {
            return
        }
    }
    if (!(/[0-9]/.test(displayStr)) && checkOp(char)) { //check for entering first time op multi times
        alert("Enter valid number")
        return
    }

    if (displayStr[(displayStr.length) - 1] == '.' && char == '.') {  // /[.]/.test(displayStr)
        return
    }
    if (isOp != 0 && checkOp(char)) {
        displayStr = displayStr.slice(0, -1) + char;
    }
    else {
        displayStr += char;
    }
    displayWindow();
}

function displayWindow() {
    document.querySelector('.text').innerHTML = ''
    document.querySelector('.text').innerHTML = displayStr
    console.log(displayStr);
}

//cut the line from end
function lineCutter() {  //-- not tested
    displayStr = displayStr.slice(0, -1);

    if(displayStr == '' && displayStr.length == 0){
        displayStr='0'
        displayWindow();
    }
    else{
        displayWindow();
    }

}


function calculate(num1, num2, op) {
    switch (op) {
        case 1: return num1 + num2; break;
        case 2: return num1 - num2; break;
        case 3: return num1 * num2; break;
        case 4: return num1 / num2; break;
    }
}

function calculator() {
    let temp1 = '';
    let temp2 = '';
    let operator = 0;
    let isFirst = 1;

    for (let i = 0; i < displayStr.length; ++i) {
        let isOp = checkOp(displayStr[i]);


        if (isOp !== 0) {
            if (isFirst === 1) {
                isFirst = 0;
                operator = isOp;
                continue;
            }

            temp1 = String(calculate(Number(temp1), Number(temp2), operator));
            temp2 = '';
            operator = isOp;
            continue;
        }


        if (isFirst === 1) {
            temp1 += displayStr[i];
        } else {
            temp2 += displayStr[i];
        }

        if (i === (displayStr.length - 1)) {
            console.log('Final calc before: temp1=' + temp1 + ', temp2=' + temp2);
            temp1 = String(calculate(Number(temp1), Number(temp2), operator));
        }
    }

    displayStr = String(Math.round(Number(checkError(temp1)) * 100) / 100); 
    displayWindow();
    console.log('Final result:', temp1);
}

function checkError(tmp) {
    if (tmp == 'undefined' || tmp == 'error') {
        return displayStr
    }
    else {
        return tmp
    }
}