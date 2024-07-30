import {describe, expect, test} from '@jest/globals';
import ICalculator, { CalculatorTask } from "../../business/ICalculator"
import LoadProCalculator from "../../infra/LoadProCalculator"
import InvalidArgumentException from '../../business/exceptions/InvalidArgumentException';
import { metadata, tracking } from '../utils/tracking';


describe('Subtraction', () => {

  let calculator: ICalculator;

  beforeAll(() => {
    calculator = new LoadProCalculator()
  })

  test(`[LPC-101] loanpro-calculator-cli subtract 100 102 → Result: -2`, async () => {

    const argument0 = "100"
    const argument1 = "102"
    const expected = -2

    const result = await calculator.subtract(argument0, argument1)

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-101'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-102] loanpro-calculator-cli subtract 12 8 → Result: 4', async () => {

    const argument0 = "12"
    const argument1 = "8"
    const expected = 4

    const result = await calculator.subtract(argument0, argument1)

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-102'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-103] loanpro-calculator-cli subtract 50 50 → Result: 0', async () => {

    const argument0 = "50"
    const argument1 = "50"
    const expected = 0

    const result = await calculator.subtract(argument0, argument1)

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-103'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-104] loanpro-calculator-cli subtract 100 -55 → Result: 155', async () => {

    const argument0 = "100"
    const argument1 = "-55"
    const expected = 155

    const result = await calculator.subtract(argument0, argument1)

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-104'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-105] loanpro-calculator-cli subtract 100 -102 → Result: 202', async () => {

    const argument0 = "100"
    const argument1 = "-102"
    const expected = 202

    const result = await calculator.subtract(argument0, argument1)

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-105'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-106] loanpro-calculator-cli subtract 2.5 1.1 → Result: 1.4', async () => {

    const argument0 = "2.5"
    const argument1 = "1.1"
    const expected = 1.4

    const result = await calculator.subtract(argument0, argument1)

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-106'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-107] loanpro-calculator-cli subtract 2,5 1 → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = "2,5"
    const argument1 = "1"
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    try {
      result = await calculator.subtract(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      exception: InvalidArgumentException,
      testCaseId: 'LPC-107'
    })

    await expect(async () => await calculator.subtract(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-108] loanpro-calculator-cli subtract 1e6 100001 → Result: 899999', async () => {

    const argument0 = "1e6"
    const argument1 = "100001"
    const expected = 899999

    const result = await calculator.subtract(argument0, argument1)

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      testCaseId: 'LPC-108'
    })

    expect(result).toEqual(expected)
  })

  test('[LPC-109] loanpro-calculator-cli subtract 2d 2d → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = '2d'
    const argument1 = '2d'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    metadata({
      testCaseId: 'LPC-109',
    })

    try {
      result = await calculator.subtract(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      exception: InvalidArgumentException,
      testCaseId: 'LPC-109'
    })

    await expect(async () => await calculator.subtract(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-110] loanpro-calculator-cli subtract 5f 2f → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = '5f'
    const argument1 = '2f'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    metadata({
      testCaseId: 'LPC-110',
    })

    try {
      result = await calculator.subtract(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      exception: InvalidArgumentException,
      testCaseId: 'LPC-110'
    })

    await expect(async () => await calculator.subtract(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-111] loanpro-calculator-cli subtract 2c 2c → [InvalidArgumentException] Invalid argument. Must be a numeric value', async () => {

    const argument0 = '2c'
    const argument1 = '2c'
    const expected = 'Invalid argument. Must be a numeric value.'

    let result: any;

    metadata({
      testCaseId: 'LPC-111',
    })

    try {
      result = await calculator.subtract(argument0, argument1)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
      exception: InvalidArgumentException,
    })

    await expect(async () => await calculator.subtract(argument0, argument1))
      .rejects.toThrowError(InvalidArgumentException)
  })

  test('[LPC-112] loanpro-calculator-cli subtract cos(1) cos(2) => Result: 0.9564491424', async () => {

    const argument0 = "cos(1)"
    const argument1 = "cos(2)"
    const expected = 0.9564491424
    let result;

    metadata({
      testCaseId: 'LPC-112',
      tagsList: ['TODO', 'trigonometric'],
    })

    try {
      result = await calculator.subtract(argument0, argument1)
    } catch (err) {
      result = err?.message
    }

    tracking({
      operation: CalculatorTask.SUBTRACT,
      argument0,
      argument1,
      received: result,
      expected,
    })

    expect(result).toBeCloseTo(expected)
  })

})
