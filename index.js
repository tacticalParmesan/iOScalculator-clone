// ----------- Global variables & References -----------
const displayValue = document.querySelector("#displayed-numbers");
const resetButton = document.querySelector("#clear-btn");

let selectedOperation = undefined;
let firstNumber = 0;
let secondNumber = undefined;
let operation = "";
let result = 0;
let isCalculating = false;
let canOverwrite = false;

// ----------- Basic arithmetic operations -----------

function add(firstAddend, secondAddend) {
	return firstAddend + secondAddend;
}

function subtract(firstSubtrahend, secondSubtrahend) {
	return firstSubtrahend - secondSubtrahend;
}

function multiply(firstFactor, secondFactor) {
	return firstFactor * secondFactor;
}

function divide(firstDividend, secondDividend) {
	if (secondDividend !== 0) {
		return firstDividend / secondDividend;
	} else {
		alert("Cannot divide by zero!");
	}
}

// ----------- Expression evaluation -----------

function operate(operator, firstNumber, secondNumber = firstNumber) {
	/* The operate function will call a different operation function according to the
	expression given as input */
	/* Every operation is store inside an object used as a collection of operands, so
	that when the user gives an expression it will be evaluated according to the symbol.	
	/* If the second number is omitted, in that case perform the operation with
	just the first one. */
	const operators = {
		"+": add,
		"-": subtract,
		"*": multiply,
		"/": divide,
	};

	// Perform the calculation based on the given symbol
	if (operator in operators) {
		result = operators[operator](+firstNumber, +secondNumber);
		return isFloat(result) ? parseFloat(result.toFixed(6)) : result;
		}
	}


function updateDisplayedValue(clickedNumber) {
	/* This function gets called every time the user presses a number button: it's
	purpose is to add numbers to the display. It checks for zero since zero means
	that the calculator has started now or has been reset. */
	if (displayValue.textContent == 0 && !isFloat(displayValue.textContent)) {
		displayValue.textContent = clickedNumber;
	} else if (canOverwrite) {
		displayValue.textContent = clickedNumber;
		canOverwrite = false;
	} else {
		displayValue.textContent += clickedNumber;
	}
}

function setCurrentOperation(clickedOperation) {
	/* Set the current operation to the clicked one, save the first number in memory and
	 enable the calcution and display overwrting behaviour.*/
	selectedOperation = clickedOperation;
	firstNumber = displayValue.textContent;
	isCalculating = true;
	canOverwrite = true;
}

function listenForOperationSelection() {
	const operationButtons = document.querySelectorAll(".operation-button");

	operationButtons.forEach(function (operationButton) {
		operationButton.addEventListener("mousedown", (ev) => {
			const clickedOperation = ev.target.id;
			setCurrentOperation(clickedOperation);
		});
	});
}

function listenForNumberInput() {
	const numberButtons = document.querySelectorAll(".number-button");

	numberButtons.forEach(function (numberButton) {
		numberButton.addEventListener("mousedown", (ev) => {
			const clickedNumberValue = ev.target.textContent;
			updateDisplayedValue(clickedNumberValue);
			resetButton.textContent = "C";
		});
	});
}

function listenForReset() {
	resetButton.addEventListener("mousedown", resetCalculator);
}

function performOperation() {
	const evaluateButton = document.querySelector("#evaluate");

	/* Allow the evaluation only if there is a selected operation, perform the caclulation and 
	update the screen accordingly.*/
	evaluateButton.addEventListener("mousedown", () => {
		if (selectedOperation !== undefined) {
			secondNumber = displayValue.textContent;
			result = operate(selectedOperation, firstNumber, secondNumber);
			displayValue.textContent = result;
			isCalculating = false;
			canOverwrite = true;
		}
	});
}

function resetCalculator() {
	/* Delete the current displayed number, if there is an operation loaded reset it and when pressing
	AC reset everything. */
	if (displayValue.textContent != 0) {
		displayValue.textContent = 0;
		resetButton.textContent = "AC";
	}
	else if (displayValue == 0 && isCalculating) {
		isCalculating = false;
	} else {
		resetButton.textContent = "AC";
		isCalculating = false;
		firstNumber = 0;
		secondNumber = undefined;
		selectedOperation = undefined;
	}
}

function changeSign() {
	const changeSignButton = document.querySelector("#sign-btn");

	changeSignButton.addEventListener("mousedown", () => {
		if (displayValue.textContent != 0) {
			displayValue.textContent *= -1;
		}
	})
}

function getPercentageFormat() {
	const percentageButton = document.querySelector("#percentage-btn");

	percentageButton.addEventListener("mousedown", () => displayValue.textContent /= 10);
}

function makeNumberDecimal() {
	const floatButton = document.querySelector(".float-button");

	floatButton.addEventListener("mousedown", () => {
		if (!isFloat(displayValue.textContent)) {
			displayValue.textContent += "."
		}
	})
}

// ---------- Utility functions ----------

function isFloat(numberToCheck) {
	if (!Number.isInteger(+numberToCheck) || String(numberToCheck).includes(".")){
		return true;
	}
	return false;
}

// ---------- Load event listeneres on page load ----------

function loadFunctions() {
	document.addEventListener("DOMContentLoaded", () => {
		listenForNumberInput();
		listenForOperationSelection();
		listenForReset();
		changeSign();
		makeNumberDecimal();
		getPercentageFormat();
		performOperation();
	});
}

loadFunctions();
