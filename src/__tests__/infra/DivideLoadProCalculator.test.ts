import {describe, expect, test} from '@jest/globals';
import ICalculator, { CalculatorTask } from "../../business/ICalculator"
import LoadProCalculator from "../../infra/LoadProCalculator"
import InvalidArgumentException from '../../business/exceptions/InvalidArgumentException';
import DivideByZeroException from '../../business/exceptions/DivideByZeroException';
import { SeverityLevel, metadata, tracking } from '../utils/tracking';


describe('Divide', () => {

  let calculator: ICalculator;

  beforeAll(() => {
    calculator = new LoadProCalculator()
  })

  test(`[LPC-301] loanpro-calculator-cli divide 12 4 → Result: 3`, async () => {

    const argument0 = "12"
    const argument1 = "4"
    const expected = 3

    const result = await calculator.divide(argument0, argument1)

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-301'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-302] loanpro-calculator-cli divide 1000 0 → [DivideByZeroException] Error: Cannot divide by zero', async () => {

    let result: any;
    const argument0 = '1000'
    const argument1 = '0'
    const expected = 'Error: Cannot divide by zero'

    try {
      result = await calculator.divide(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      exception: DivideByZeroException,
      testCaseId: 'LPC-302'
    })

    await expect(async () => await calculator.divide(argument0, argument1))
      .rejects.toThrowError(DivideByZeroException)
  })

  test('[LPC-303] loanpro-calculator-cli divide 49 1 → Result: 49', async () => {

    const argument0 = '49'
    const argument1 = '1'
    const expected = 49

    const result = await calculator.divide(argument0, argument1)

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-303'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-304] loanpro-calculator-cli divide 49 -1 → Result: -49', async () => {

    const argument0 = '49'
    const argument1 = '-1'
    const expected = -49

    const result = await calculator.divide(argument0, argument1)

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-304'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-305] loanpro-calculator-cli divide -4 -2 → Result: 2', async () => {

    const argument0 = '-4'
    const argument1 = '-2'
    const expected = 2

    const result = await calculator.divide(argument0, argument1)

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-305'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-306] loanpro-calculator-cli divide 5 2 → Result: 2.5', async () => {

    const argument0 = '5'
    const argument1 = '2'
    const expected = 2.5

    const result = await calculator.divide(argument0, argument1)

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-306'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-307] loanpro-calculator-cli divide 5 2.5 → Result: 2', async () => {

    const argument0 = '5'
    const argument1 = '2.5'
    const expected = 2

    const result = await calculator.divide(argument0, argument1)

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-307'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-308] loanpro-calculator-cli divide 2,5 1 → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {
    
    const argument0 = '2,5'
    const argument1 = '1'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    try {
      result = await calculator.divide(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.ADD,
      argument0,
      argument1,
      received: result,
      expected,
      exception: InvalidArgumentException,
      testCaseId: 'LPC-308'
    })
    await expect(async () => await calculator.divide(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })


  test('[LPC-309] loanpro-calculator-cli divide 2e6 1000 → Result: 2000', async () => {

    const argument0 = '2e6'
    const argument1 = '1000'
    const expected = 2000

    const result = await calculator.divide(argument0, argument1)

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-309'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-310] loanpro-calculator-cli divide 2300000 1e5 → Result: 23', async () => {

    const argument0 = '2300000'
    const argument1 = '1e5'
    const expected = 23

    const result = await calculator.divide(argument0, argument1)

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-310'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-311] loanpro-calculator-cli divide 2300000 1e6 → Result: 2.3', async () => {

    const argument0 = '2300000'
    const argument1 = '1e6'
    const expected = 2.3

    const result = await calculator.divide(argument0, argument1)

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-311'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-312] loanpro-calculator-cli divide 10d 2d → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {
    
    let result: any;
    const argument0 = '10d'
    const argument1 = '2d'
    const expected = 'Invalid argument. Must be a numeric value.'

    try {
      result = await calculator.divide(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-312'
    })

    await expect(async () => await calculator.divide(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-313] loanpro-calculator-cli divide 2f 10f → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    let result: any;
    const argument0 = '2f'
    const argument1 = '10f'
    const expected = 'Invalid argument. Must be a numeric value.'

    try {
      result = await calculator.divide(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-313'
    })

    await expect(async () => await calculator.divide(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-314] loanpro-calculator-cli divide 10c 10c → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    let result: any;
    const argument0 = '10c'
    const argument1 = '10c'
    const expected = 'Invalid argument. Must be a numeric value.'

    try {
      result = await calculator.divide(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-314',
      severityLevel: SeverityLevel.CRITICAL,
    })

    await expect(async () => await calculator.divide(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-315] loanpro-calculator-cli divide tan(1) tan(2) → Result: 1', async () => {

    const argument0 = 'tan(1)'
    const argument1 = 'tan(2)'
    const expected = 1
    let result

    metadata({
      testCaseId: 'LPC-315',
      tagsList: ['TODO', 'trigonometric'],
    })

    try {
      result = await calculator.divide(argument0, argument1)
    } catch (err) {
      result = err?.message
    }

    tracking({
      operation: CalculatorTask.DIVIDE,
      argument0,
      argument1,
      received: result,
      expected,
      severityLevel: SeverityLevel.CRITICAL,
    })

    expect(result).toEqual(expected)
  })

})
