const buttons = document.querySelectorAll('button');
const viewResult = document.querySelector('#result');
const viewOperations = document.querySelector('#operation');
let pressOperationSign = false;
let pressedNumber = 0;
let result = 0;
let pressedSign = '';

const operations = (event) => {
    switch (event.currentTarget.textContent) {
        case '+':
        case '-':
        case 'x':
        case '/':
            if (viewOperations.value.charAt(viewOperations.value.length - 1) === '=') {
                viewOperations.value = '';
            }
            viewOperations.value += (viewOperations.value != '') ? viewResult.value : viewResult.value;
            viewOperations.value = (viewOperations.value != '') ? viewOperations.value : '0';
            viewOperations.value += event.currentTarget.textContent;
            result = (result === 0) ? pressedNumber : realizeOperations(pressedSign);
            break;
        case '+/-':
            //viewOperations.value = (viewOperations.value.startsWith('-')) ? viewOperations.value.slice(1, viewOperations.value.length) : '-' + viewOperations.value;
            if (viewResult.value.startsWith('-')) {
                viewResult.value = viewResult.value.slice(1, viewResult.value.length);
            } else {
                viewResult.value = '-' + viewResult.value;
            }
            pressedNumber *= -1;
            break;
        case 'Borrar':
            viewResult.value = viewResult.value.substring(0, viewResult.value.length - 1);
            break;
        case 'CE':
            viewResult.value = '';
            break;
        case 'C':
            viewResult.value = '';
            viewOperations.value = '';
            pressedNumber = 0;
            result = 0;
            pressedSign = '';
            break;
        case '=':
            result = (result === 0) ? pressedNumber : realizeOperations(pressedSign);
            viewOperations.value += (viewOperations.value != '') ? viewResult.value : viewResult.value;
            viewOperations.value += event.currentTarget.textContent;
            viewResult.value = String(result);
    }
    if (event.currentTarget.textContent !== '+/-') {
        pressedSign = event.currentTarget.textContent;
    }
    pressOperationSign = true;
}

const realizeOperations = (sign) => {
    console.log(pressedNumber);
    console.log(sign);
    switch (sign) {
        case '+':
            result += pressedNumber;
            break;
        case '-':
            result -= pressedNumber;
            break;
        case 'x':
            result *= pressedNumber;
            break;
        case '/':
            result /= pressedNumber;
            break;
    }
    return result;
}

for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent === '.' || parseInt(buttons[i].textContent) <= 9) {
        buttons[i].addEventListener('click', (event) => {
            viewResult.value = (pressOperationSign) ? '' : viewResult.value;
            viewResult.value += event.currentTarget.textContent;

            if (viewOperations.value.charAt(viewOperations.value.length - 1) === '=') {
                result = 0;
            }

            if (event.currentTarget.textContent === '.') {
                if (viewResult.value.split(".").length > 2) {
                    viewResult.value = viewResult.value.slice(0, -1);
                }
                //console.log(typeof viewResult.value);
                if (viewResult.value.startsWith('.')) { // si ha introducido un punto antes que un numero
                    viewResult.value = '0'.concat(viewResult.value);
                }
            }
            pressedNumber = parseFloat(viewResult.value);
            pressOperationSign = false;
        });
    } else {
        buttons[i].addEventListener('click', operations);
    }
}
