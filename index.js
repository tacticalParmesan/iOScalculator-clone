// Basic arithmetic operations
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

// Expression evaluation

function operate(operator, firstNumber, secondNumber) {
	/* The operate function will call a different operation function according to the
	expression given as input */
	/* Every operation is store inside an object used as a collection of operands, so
	that when the user gives an expression it will be evaluated according to the symbol */
	const operators = {
		"+": add,
		"-": subtract,
		"*": multiply,
		"/": divide,
	};

	// Perform the calculation based on the given symbol
	if (operator in operators) {
		return operators[operator](firstNumber, secondNumber);
	}
}

// Populate the display when pressing number buttons
const displayValueElement = document.querySelector("#displayed-numbers");
let displayValueContent = displayValueElement.textContent;
const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operation-button");

function updateDisplayWithNumbers() {
	/** 
	 * Update the display by concatenating numbers everytime a number button is pressed.
	 * Every number button will add their own text content to the display. 
	 */
	numberButtons.forEach((numberButton) => {
		numberButton.addEventListener("mousedown", (clickEvent) => {
			const numberToAdd = clickEvent.target.textContent;

			/* Check if the only number is a zero, if yes, it means the calculator
			has been turn on right now or it has been reset. Let's replace the 0.*/
			if(displayValueContent === "0"){
				displayValueElement.textContent = numberToAdd;
			} else {
				displayValueElement.textContent += numberToAdd;
			}

			// Update the display value variable to be used to perform calculations
			displayValueContent = displayValueElement.textContent
		});
	})
}

function updateDisplayWithOperations() {
	/**
	 * Update the display by concatenating numbers everytime an op button is pressed.
	 * Every operation button will add their own value to the display. 
	 */
	operationButtons.forEach((operationButton) => {
		operationButton.addEventListener("mousedown", (clickEvent) => {
			const operationToAdd = clickEvent.target.id;
			
			/* Check if the last charcter in the displayed string is a number to avoid
			being able to start with an operation.
			We are looking for the second last character because there are *intended* 
			spaces in the id of the click target.*/
			let lastDigit = displayValueElement.textContent.slice(-2);
			if(lastDigit !== "0"){
				if(!isNaN(lastDigit)) {
					displayValueElement.textContent += operationToAdd;
				}
			}

			// Update the display value variable to be used to perform calculations
			displayValueContent = displayValueElement.textContent
		});
	});
}


updateDisplayWithNumbers();
updateDisplayWithOperations();
