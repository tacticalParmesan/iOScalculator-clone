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
	}
	else {
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
		"/": divide
	}

	// Perform the calculation based on the given symbol
	if (operator in operators) {
		return operators[operator](firstNumber, secondNumber);
	}
}

console.log(operate("+",10,10));