// ----------- Global variables & References -----------
const displayValue = document.querySelector("#displayed-numbers");
const resetButton = document.querySelector("#clear-btn");
const operationButtons = document.querySelectorAll(".operation-button");
const root = document.querySelector(":root");

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

// ----------- Expression evaluation and operations -----------

function operate(operator, firstNumber, secondNumber = firstNumber) {
	/* The operate function will call a different operation function according to the
	expression given as input */
	/* Every operation is stored inside an object used as a collection of operands, so
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

		// And also check if the result would overflow from the display (applies to both integers and floats)
		if (String(result).length > 9 && Number.isInteger(result)) {
			result = result.toExponential(3);
		} else if (
			isFloat(result) ||
			(isFloat(result) && String(result).length > 10)
		) {
			result = parseFloat(result.toFixed(6));
		}
		return result;
	}
}

function setCurrentOperation(clickedOperation) {
	/* Set the current operation to the clicked one, save the first number in memory and
		enable the calcution and display overwrting behaviour.*/
	if (clickedOperation === "x") {
		selectedOperation = "*";
	} else if (clickedOperation === "÷") {
		selectedOperation = "/";
	} else {
		selectedOperation = clickedOperation;
	}
	firstNumber = displayValue.textContent;
	isCalculating = true;
	canOverwrite = true;
}

function performOperation() {
	resetOperationUI();

	// The calculation logic gets called if there is an operation selected
	if (selectedOperation !== undefined) {
		// Stores in memory the displayed number, performs the calculation and updates display accordingly
		secondNumber = displayValue.textContent;
		result = operate(selectedOperation, firstNumber, secondNumber);
		displayValue.textContent = result;
		adjustDisplaySize();

		// Changes the flags for calculation and overwriing the screen
		isCalculating = false;
		canOverwrite = true;
	}
}

function changeSign() {
	const changeSignButton = document.querySelector("#sign-btn");

	changeSignButton.addEventListener("mousedown", () => {
		if (displayValue.textContent != 0) {
			displayValue.textContent *= -1;
		}
	});
}

function getPercentageFormat() {
	const percentageButton = document.querySelector("#percentage-btn");

	percentageButton.addEventListener("mousedown", () => {
		const percentageFormat = (displayValue.textContent /= 100);
		if (String(percentageFormat).length > 9) {
			displayValue.textContent = percentageFormat.toExponential(2);
		}
	});
}

function makeNumberDecimal() {
	// It also checks if the floating point would be at the end of the number, a behaviour to avoid
	if (
		!isFloat(displayValue.textContent) &&
		displayValue.textContent.length < 8
	) {
		displayValue.textContent += ".";
	}
}

function resetCalculator() {
	/* Delete the current displayed number, if there is an operation loaded reset it and when pressing
	AC reset everything. */
	if (displayValue.textContent != 0) {
		displayValue.textContent = 0;
		canOverwrite = false;
		resetButton.textContent = "AC";
	} else if (displayValue == 0 && isCalculating) {
		isCalculating = false;
		canOverwrite = false;
		resetOperationUI();
	} else {
		resetButton.textContent = "AC";
		isCalculating = false;
		canOverwrite = false;
		firstNumber = 0;
		secondNumber = undefined;
		selectedOperation = undefined;
		resetOperationUI();
	}
	adjustDisplaySize();
}

// ---------- UI Behaviour ------------

function updateDisplayedValue(enteredNumber) {
	/* This function gets called every time the user presses a number button: it's
	purpose is to add numbers to the display. It checks for zero since zero means
	that the calculator has started now or has been reset. */

	if (displayValue.textContent == 0 && !isFloat(displayValue.textContent)) {
		displayValue.textContent = enteredNumber;
	} else if (canOverwrite) {
		displayValue.textContent = enteredNumber;
		canOverwrite = false;
	} else if (displayValue.textContent.length < 9) {
		displayValue.textContent += enteredNumber;
	}

	adjustDisplaySize();
}

function adjustDisplaySize() {
	/* This function changes the size of the displayed content to fit the display.*/
	if (displayValue.textContent.length > 6) {
		root.style.setProperty("--display-font-size", "8vh");
		if (displayValue.textContent.length > 8) {
			root.style.setProperty("--display-font-size", "7vh");
		}
	} else if (displayValue.textContent.length < 7) {
		root.style.setProperty("--display-font-size", "10vh");
	}
}

function updateOperationUI(clickedOperation) {
	/* Changes the look of the operation button to signal to he user that an operation is selected.*/
	const selectedOperationButton = document.querySelector(
		"#" + clickedOperation
	);

	resetOperationUI();
	selectedOperationButton.classList.replace(
		"operation-button",
		"selected-operation"
	);
}

function resetOperationUI() {
	/* Called every time that an operation is selected, restores all buttons to default colors.*/
	operationButtons.forEach((operationButton) => {
		operationButton.className = "operation-button";
	});
}

function listenForOperationSelection() {
	operationButtons.forEach(function (operationButton) {
		operationButton.addEventListener("mousedown", (ev) => {
			const clickedOperation = ev.target.textContent;
			setCurrentOperation(clickedOperation);

			const clickedOperationButton = ev.target.id;
			updateOperationUI(clickedOperationButton);
		});
	});
}

function listenForNumberInput() {
	const numberButtons = document.querySelectorAll(".number-button");

	numberButtons.forEach(function (numberButton) {
		numberButton.addEventListener("mousedown", (ev) => {
			const clickedNumberValue = ev.target.textContent;
			updateDisplayedValue(clickedNumberValue);
			resetOperationUI();
			resetButton.textContent = "C";
		});
	});
}

function listenForReset() {
	resetButton.addEventListener("mousedown", resetCalculator);
}

function listenForEvaluation() {
	const evaluateButton = document.querySelector("#evaluate");

	evaluateButton.addEventListener("mousedown", () => performOperation());
}

function listenForFloat() {
	const floatButton = document.querySelector(".float-button");

	floatButton.addEventListener("mousedown", () => makeNumberDecimal());
}

// ---------- Keyboard Behaviour ----------

function listenForKeyboardInput() {
	window.addEventListener("keydown", (keyboardEvent) => {
		keyboardEvent.preventDefault();
		const keyvalue = keyboardEvent.key;

		getNumberByKey(keyvalue);
		getOperationByKey(keyvalue);
		applyFunctionsByKey(keyvalue);
	});
}
function getNumberByKey(key) {
	if (Number.isInteger(parseInt(key))) {
		updateDisplayedValue(key);
		resetOperationUI();
	}
}

function getOperationByKey(key) {
	if (["+", "-", "/", "*"].includes(key)) {
		setCurrentOperation(key);

		switch (key) {
			case "+":
				updateOperationUI("add");
				break;

			case "-":
				updateOperationUI("subtract");
				break;

			case "*":
				updateOperationUI("multiply");
				break;

			case "/":
				updateOperationUI("divide");
				break;

			default:
				break;
		}
	}
}

function applyFunctionsByKey(key) {
	switch (key) {
		case "Enter":
			performOperation();
			break;

		case "Delete":
			resetCalculator();
			break;

		case ".":
		case "Period":
			makeNumberDecimal();
			break;

		case "Backspace":
			deleteLastNumber();

		default:
			break;
	}
}

function resetByCanc(key) {
	if (key == "Delete") {
		resetCalculator();
	}
}

// ---------- Utility functions ----------

function isFloat(numberToCheck) {
	if (
		!Number.isInteger(+numberToCheck) ||
		String(numberToCheck).includes(".")
	) {
		return true;
	}
	return false;
}

function deleteLastNumber() {
	if (displayValue.textContent.length > 1) {
		displayValue.textContent = displayValue.textContent.slice(0, -1);
	}
}

// ---------- Load event listeneres on page load ----------

function loadFunctions() {
	document.addEventListener("DOMContentLoaded", () => {
		listenForNumberInput();
		listenForOperationSelection();
		listenForEvaluation();
		listenForReset();
		listenForKeyboardInput();
		changeSign();
		listenForFloat();
		getPercentageFormat();
		performOperation();
	});
}

// Everything is called from here!
loadFunctions();
