import {describe, expect, test} from '@jest/globals';
import ICalculator, { CalculatorTask } from "../../business/ICalculator"
import LoadProCalculator from "../../infra/LoadProCalculator"
import InvalidArgumentException from '../../business/exceptions/InvalidArgumentException';
import { metadata, tracking } from '../utils/tracking';


describe('Multiply', () => {

  let calculator: ICalculator;

  beforeAll(() => {
    calculator = new LoadProCalculator()
  })

  test(`[LPC-201] loanpro-calculator-cli multiply 3 4 → Result: 12`, async () => {

    const argument0 = "3"
    const argument1 = "4"
    const expected = 12

    const result = await calculator.multiply(argument0, argument1)

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-201'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-202] loanpro-calculator-cli multiply 1000 0 → Result: 0', async () => {

    const argument0 = "1000"
    const argument1 = "0"
    const expected = 0

    const result = await calculator.multiply(argument0, argument1)

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-202'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-203] loanpro-calculator-cli multiply 1000 1 → Result: 1000', async () => {

    const argument0 = "1000"
    const argument1 = "1"
    const expected = 1000

    const result = await calculator.multiply(argument0, argument1)

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-203'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-204] loanpro-calculator-cli multiply 5 -1 → Result: -5', async () => {

    const argument0 = "5"
    const argument1 = "-1"
    const expected = -5

    const result = await calculator.multiply(argument0, argument1)

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-204'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-205] loanpro-calculator-cli multiply -2 -10 → Result: 20', async () => {

    const argument0 = "-2"
    const argument1 = "-10"
    const expected = 20

    const result = await calculator.multiply(argument0, argument1)

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-205'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-206] loanpro-calculator-cli multiply 2.5 2 → Result: 5', async () => {

    const argument0 = "2.5"
    const argument1 = "2"
    const expected = 5

    const result = await calculator.multiply(argument0, argument1)

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-206'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-207] loanpro-calculator-cli multiply 2,5 1 → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = '2,5'
    const argument1 = '1'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    try {
      result = await calculator.multiply(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      exception: InvalidArgumentException,
      testCaseId: 'LPC-207'
    })

    await expect(async () => await calculator.multiply(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })


  test('[LPC-208] loanpro-calculator-cli multiply 1e3 200 → Result: 200000', async () => {

    const argument0 = "1e3"
    const argument1 = "200"
    const expected = 200000

    const result = await calculator.multiply(argument0, argument1)

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-208'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-209] loanpro-calculator-cli multiply 1e20 1e50 → Result: 1e70', async () => {

    const argument0 = "1e20"
    const argument1 = "1e50"
    const expected = 1e70

    const result = await calculator.multiply(argument0, argument1)

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-209'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-210] loanpro-calculator-cli multiply 1e20 1e19 → Result: 1000000000000000000000000000000000000000', async () => {

    const argument0 = "1e20"
    const argument1 = "1e19"
    const expected = 1000000000000000000000000000000000000000

    const result = await calculator.multiply(argument0, argument1)

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-210'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-211] loanpro-calculator-cli multiply 2d 3d → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = '2d'
    const argument1 = '3d'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    try {
      result = await calculator.multiply(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      exception: InvalidArgumentException,
      testCaseId: 'LPC-211'
    })

    await expect(async () => await calculator.multiply(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-212] loanpro-calculator-cli multiply 2f 4f → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = '2f'
    const argument1 = '4f'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    try {
      result = await calculator.multiply(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      exception: InvalidArgumentException,
      testCaseId: 'LPC-212'
    })

    await expect(async () => await calculator.multiply(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-213] loanpro-calculator-cli multiply 2c 5c → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = '2c'
    const argument1 = '5c'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    try {
      result = await calculator.multiply(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      exception: InvalidArgumentException,
      testCaseId: 'LPC-213'
    })

    await expect(async () => await calculator.multiply(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('loanpro-calculator-cli multiply sin(1) sin(2) → Result: 0.7651474012', async () => {

    const argument0 = "sin(1)"
    const argument1 = "sin(2)"
    const expected = 0.7651474012
    let result

    metadata({
      testCaseId: 'LPC-210',
      tagsList: ['TODO', 'trigonometric'],
    })

    try {
      result = await calculator.multiply(argument0, argument1)
    } catch (err) {
      result = err?.message
    }

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
    })

    expect(result).toBeCloseTo(expected)
  })

})
