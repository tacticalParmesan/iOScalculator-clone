// ----------- Global variables & References -----------
const displayValue = document.querySelector("#displayed-numbers");
const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operation-button");
const evaluateButton = document.querySelector("#evaluate");
let selectedOperation = "";
let firstNumber = 0;
let operation = "";
let secondNumber = undefined;
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
		return operators[operator](+firstNumber, +secondNumber);
	}
}

function updateDisplayedValue(clickedNumber) {
	/* This function gets called every time the user presses a number button: it's
	purpose is to add numbers to the display. It checks for zero since zero means
	that the calculator has started now or has been reset. */
	if (displayValue.textContent == 0) {
		displayValue.textContent = clickedNumber;
	}
	else if (canOverwrite) {
		displayValue.textContent = clickedNumber;
		canOverwrite = false;
	}
	else {
		displayValue.textContent += clickedNumber;
	}
}

function setCurrentOperation(clickedOperation) {
	selectedOperation = clickedOperation;
	firstNumber = displayValue.textContent;
	isCalculating = true;
	canOverwrite = true;
}

function listenForOperationSelection() {
	operationButtons.forEach( function(operationButton) {
		operationButton.addEventListener("mousedown", (ev) => {
			const clickedOperation = ev.target.id;
			setCurrentOperation(clickedOperation);
		})
	})
}

function listenForNumberInput() {
	numberButtons.forEach( function(numberButton) {
		numberButton.addEventListener("mousedown", (ev) => {
			const clickedNumberValue = ev.target.textContent;
			updateDisplayedValue(clickedNumberValue);
		})
	})
}

function performOperation() {
	evaluateButton.addEventListener("mousedown", () => {
		if(isCalculating) {
			secondNumber = displayValue.textContent;
			result = operate(selectedOperation, firstNumber, secondNumber);
			displayValue.textContent = result;
		}
		isCalculating = false;
		canOverwrite = true;

	})
}

// ---------- Load event listeneres on page load ----------

function loadFunctions() {
	document.addEventListener("DOMContentLoaded", () => {
		listenForNumberInput();
		listenForOperationSelection();
		performOperation();
	})
}

loadFunctions();