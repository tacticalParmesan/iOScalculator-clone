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

function updateNumbers() {
	/**
	 * Update the display by concatenating numbers everytime a number button is pressed.
	 * Every number button will add their own text content to the display.
	 */
	numberButtons.forEach((numberButton) => {
		numberButton.addEventListener("mousedown", (clickEvent) => {
			const numberToAdd = clickEvent.target.textContent;

			/* Check if the only number is a zero, if yes, it means the calculator
			has been turn on right now or it has been reset. Let's replace the 0.*/
			if (displayValue.textContent === "0") {
				displayValue.textContent = numberToAdd;
			} else if (displayValue !== "0") {
				if (!isCalculating) {
					displayValue.textContent = numberToAdd;
				} else {
					displayValue.textContent += numberToAdd
				}
			}

			/* If the user has not already selected an operation, load the displayed number
			in memory to perform the operation later, if it has, the program should expect 
			the second number.*/
			if (!isCalculating) {
				firstNumber = displayValue.textContent;
			} else if (isCalculating) {
				secondNumber = displayValue.textContent;
			}

			// Update the display value variable to be used to perform calculations
			console.log(firstNumber);
		});
	});
}

function selectOperation() {
	/**
	 * Select an operation to be perfomed once the user presses the "=" button.
	 * TODO: Every operation button will change appearance when selected.
	 */
	operationButtons.forEach((operationButton) => {
		operationButton.addEventListener("mousedown", (clickEvent) => {
			selectedOperation = clickEvent.target.id;

			/* Let the program know that the user has selected an operation and that it
			should expect a second number, but still we handle the case it's not given
			by defaulting the second number to the first number in the operate function.*/
			operation = selectedOperation;
			isCalculating = true;

			// Clear the display
			if (isCalculating) {
				displayValue.textContent = 0;
			}
		});
	});
}

function performOperation() {
	/* Call the operate function, update the result and the first number and finally
	toggle the selecting operation flag off*/
	if (isCalculating) {
		displayValue.textContent = firstNumber = operate(
			selectedOperation,
			firstNumber,
			secondNumber
		);
	}
	isCalculating = false;
}

// ----------- Main Execution ----------

updateNumbers();
selectOperation();
evaluateButton.addEventListener("mousedown", performOperation);
