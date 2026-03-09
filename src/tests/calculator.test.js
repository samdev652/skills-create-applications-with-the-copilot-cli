'use strict';

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
} = require('../calculator');

// ── Basic operations ─────────────────────────────────────────────────────────

describe('add', () => {
  test('2 + 3 = 5', () => expect(add(2, 3)).toBe(5));
  test('10 + 0 = 10', () => expect(add(10, 0)).toBe(10));
  test('negative numbers: -4 + -6 = -10', () => expect(add(-4, -6)).toBe(-10));
  test('floats: 0.1 + 0.2 ≈ 0.3', () => expect(add(0.1, 0.2)).toBeCloseTo(0.3));
});

describe('subtract', () => {
  test('10 - 4 = 6', () => expect(subtract(10, 4)).toBe(6));
  test('5 - 5 = 0', () => expect(subtract(5, 5)).toBe(0));
  test('negative result: 3 - 7 = -4', () => expect(subtract(3, 7)).toBe(-4));
});

describe('multiply', () => {
  test('45 * 2 = 90', () => expect(multiply(45, 2)).toBe(90));
  test('any number * 0 = 0', () => expect(multiply(99, 0)).toBe(0));
  test('negative * positive: -3 * 4 = -12', () => expect(multiply(-3, 4)).toBe(-12));
  test('negative * negative: -3 * -4 = 12', () => expect(multiply(-3, -4)).toBe(12));
});

describe('divide', () => {
  test('20 / 5 = 4', () => expect(divide(20, 5)).toBe(4));
  test('10 / 4 = 2.5', () => expect(divide(10, 4)).toBe(2.5));
  test('0 / 5 = 0', () => expect(divide(0, 5)).toBe(0));
  test('division by zero throws', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
  });
});

// ── Extended operations ──────────────────────────────────────────────────────

describe('modulo', () => {
  test('5 % 2 = 1', () => expect(modulo(5, 2)).toBe(1));
  test('10 % 3 = 1', () => expect(modulo(10, 3)).toBe(1));
  test('9 % 3 = 0 (exact division)', () => expect(modulo(9, 3)).toBe(0));
  test('negative dividend: -7 % 3 = -1', () => expect(modulo(-7, 3)).toBe(-1));
  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow('Modulo by zero is not allowed');
  });
});

describe('power', () => {
  test('2 ^ 3 = 8', () => expect(power(2, 3)).toBe(8));
  test('2 ^ 8 = 256', () => expect(power(2, 8)).toBe(256));
  test('any number ^ 0 = 1', () => expect(power(99, 0)).toBe(1));
  test('any number ^ 1 = itself', () => expect(power(7, 1)).toBe(7));
  test('negative exponent: 2 ^ -1 = 0.5', () => expect(power(2, -1)).toBe(0.5));
});

describe('squareRoot', () => {
  test('√16 = 4', () => expect(squareRoot(16)).toBe(4));
  test('√25 = 5', () => expect(squareRoot(25)).toBe(5));
  test('√0 = 0', () => expect(squareRoot(0)).toBe(0));
  test('√2 ≈ 1.414', () => expect(squareRoot(2)).toBeCloseTo(1.414, 3));
  test('square root of negative number throws', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of a negative number is not allowed');
  });
  test('square root of negative float throws', () => {
    expect(() => squareRoot(-0.5)).toThrow('Square root of a negative number is not allowed');
  });
});

// ── calculate dispatcher ─────────────────────────────────────────────────────

describe('calculate', () => {
  test('dispatches +', () => expect(calculate(2, '+', 3)).toBe(5));
  test('dispatches -', () => expect(calculate(10, '-', 4)).toBe(6));
  test('dispatches *', () => expect(calculate(45, '*', 2)).toBe(90));
  test('dispatches /', () => expect(calculate(20, '/', 5)).toBe(4));
  test('dispatches %', () => expect(calculate(5, '%', 2)).toBe(1));
  test('dispatches **', () => expect(calculate(2, '**', 3)).toBe(8));
  test('unknown operator throws', () => {
    expect(() => calculate(1, '^', 2)).toThrow('Unknown operator');
  });
});
