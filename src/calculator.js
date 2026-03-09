/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   - Addition       (+):  add(a, b)
 *   - Subtraction    (-):  subtract(a, b)
 *   - Multiplication (×):  multiply(a, b)
 *   - Division       (÷):  divide(a, b)
 *   - Modulo         (%):  modulo(a, b)
 *   - Power          (**): power(base, exponent)
 *   - Square Root    (√):  squareRoot(n)
 */

'use strict';

const readline = require('readline');

/**
 * Addition: returns the sum of a and b.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtraction: returns the difference of a and b.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplication: returns the product of a and b.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Division: returns the quotient of a divided by b.
 * Throws an error if b is zero.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

/**
 * Modulo: returns the remainder of a divided by b.
 * Throws an error if b is zero.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed');
  }
  return a % b;
}

/**
 * Power (Exponentiation): returns base raised to the exponent.
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Square Root: returns the square root of n.
 * Throws an error if n is negative.
 * @param {number} n
 * @returns {number}
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed');
  }
  return Math.sqrt(n);
}

/**
 * Evaluates a calculation given two operands and an operator.
 * @param {number} a
 * @param {string} operator  One of: +, -, *, /
 * @param {number} b
 * @returns {number}
 */
function calculate(a, operator, b) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*':
    case '×': return multiply(a, b);
    case '/':
    case '÷': return divide(a, b);
    case '%': return modulo(a, b);
    case '**': return power(a, b);
    default:
      throw new Error(`Unknown operator: "${operator}". Use +, -, *, /, %, **`);
  }
}

// ── CLI entry point ──────────────────────────────────────────────────────────
// Only run the interactive prompt when this file is executed directly.
if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('🧮  Node.js CLI Calculator');
  console.log('    Supported operations: + - * /');
  console.log('    Type "exit" to quit.\n');

  const prompt = () => {
    rl.question('Enter expression (e.g. 10 + 5): ', (input) => {
      const trimmed = input.trim();
      if (trimmed.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        rl.close();
        return;
      }

      const parts = trimmed.split(/\s+/);
      if (parts.length !== 3) {
        console.log('  ⚠  Please enter an expression in the format: <number> <operator> <number>\n');
        return prompt();
      }

      const [rawA, operator, rawB] = parts;
      const a = parseFloat(rawA);
      const b = parseFloat(rawB);

      if (isNaN(a) || isNaN(b)) {
        console.log('  ⚠  Both operands must be valid numbers.\n');
        return prompt();
      }

      try {
        const result = calculate(a, operator, b);
        console.log(`  = ${result}\n`);
      } catch (err) {
        console.log(`  ⚠  ${err.message}\n`);
      }

      prompt();
    });
  };

  prompt();
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };
