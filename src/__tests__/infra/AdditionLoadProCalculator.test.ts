import {describe, expect, test} from '@jest/globals';
import ICalculator, { CalculatorTask } from "../../business/ICalculator"
import LoadProCalculator from "../../infra/LoadProCalculator"
import InvalidArgumentException from '../../business/exceptions/InvalidArgumentException';
import { metadata, tracking } from '../utils/tracking';


describe('Addition', () => {

  let calculator: ICalculator;

  beforeAll(async () => {
    calculator = new LoadProCalculator()
  })

  test(`[LPC-001] loanpro-calculator-cli add 100 102 → Result: 202`, async () => {

    const argument0 = "100"
    const argument1 = "102"
    const expected = 202

    const result = await calculator.add(argument0, argument1)

    tracking({
      operation: CalculatorTask.ADD,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-001'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-002] loanpro-calculator-cli add 12 8 → Result: 20', async () => {
    const argument0 = "12"
    const argument1 = "8"
    const expected = 20

    const result = await calculator.add(argument0, argument1)

    tracking({
      operation: CalculatorTask.ADD,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-002'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-003] loanpro-calculator-cli add 100 -55 → Result: 45', async () => {

    const argument0 = "100"
    const argument1 = "-55"
    const expected = 45

    const result = await calculator.add(argument0, argument1)

    tracking({
      operation: CalculatorTask.ADD,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-003'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-004] loanpro-calculator-cli add 100 -102 → Result: -2', async () => {

    const argument0 = "100"
    const argument1 = "-102"
    const expected = -2

    const result = await calculator.add(argument0, argument1)

    tracking({
      operation: CalculatorTask.ADD,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-003'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-005] loanpro-calculator-cli add 2.5 2.4 → Result: 4.9', async () => {

    const argument0 = "2.5"
    const argument1 = "2.4"
    const expected = 4.9

    const result = await calculator.add(argument0, argument1)

    tracking({
      operation: CalculatorTask.ADD,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-005'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-006] loanpro-calculator-cli add 2,5 1 → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = '2,5'
    const argument1 = '1'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    try {
      result = await calculator.add(argument0, argument1)
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
      testCaseId: 'LPC-006'
    })

    await expect(async () => await calculator.add(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-007] loanpro-calculator-cli add 1e6 1000 → Result: 1001000', async () => {

    const argument0 = "1e6"
    const argument1 = "1000"
    const expected = 1001000

    const result = await calculator.add(argument0, argument1)

    tracking({
      operation: CalculatorTask.ADD,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-007'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-008] loanpro-calculator-cli add 2d 2d → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = '2d'
    const argument1 = '2d'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    try {
      result = await calculator.add(argument0, argument1)
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
      testCaseId: 'LPC-008'
    })

    await expect(async () => await calculator.add(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-009] loanpro-calculator-cli add 2f 2f → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = '2f'
    const argument1 = '2f'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    try {
      result = await calculator.add(argument0, argument1)
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
      testCaseId: 'LPC-009',
    })

    await expect(async () => await calculator.add(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-010] loanpro-calculator-cli add 2c 2c → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {
    
    const argument0 = '2c'
    const argument1 = '2c'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    try {
      result = await calculator.add(argument0, argument1)
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
      testCaseId: 'LPC-010'
    })

    await expect(async () => await calculator.add(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-011] loanpro-calculator-cli add sin(1) sin(2) → Result: 1.7507684116', async () => {

    const argument0 = "sin(1)"
    const argument1 = "sin(2)"
    const expected = 1.7507684116
    let result

    metadata({
      testCaseId: 'LPC-011',
      tagsList: ['TODO', 'trigonometric'],
    })

    try {
      result = await calculator.add(argument0, argument1)
    } catch (err) {
      result = err?.message
    }

    tracking({
      operation: CalculatorTask.ADD,
      argument0,
      argument1,
      received: result,
      expected,
    })

    expect(result).toBeCloseTo(expected)
  })

})
