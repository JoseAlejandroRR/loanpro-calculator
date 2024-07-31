import {describe, expect, test} from '@jest/globals';
import ICalculator, { CalculatorTask } from "../../business/ICalculator"
import LoadProCalculator from "../../infra/LoadProCalculator"
import InvalidOperationException from '../../business/exceptions/InvalidOperationException';
import { SeverityLevel, metadata, tracking } from '../utils/tracking';
import { logger } from '../../utils/Logger';
import executeCommand from '../../infra/ExecuteCommand';


describe('Format Input Tests', () => {

  let calculator: ICalculator;

  beforeAll(() => {
    calculator = new LoadProCalculator()
  })

  test('[LPC-501]loanpro-calculator-cli add → [InvalidOperationException]', async () => {

    let result: any;
    const argument0 = ''
    const argument1 = ''
    const expected = 'Usage: cli-calculator operation operand1 operand2\nSupported operations: add, subtract, multiply, divide'

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
      exception: InvalidOperationException,
      testCaseId: 'LPC-501',
      featureId: 'SQUARE',
      epicId: 'CALCULATOR',
      severityLevel: SeverityLevel.MINOR
    })

    await expect(async () => await calculator.square(argument0))
      .rejects.toThrowError(InvalidOperationException)
  })

  test('[LPC-502]loanpro-calculator-cli add 20 → [InvalidOperationException]', async () => {

    let result: any;
    const argument0 = '20'
    const argument1 = ''
    const expected = 'Usage: cli-calculator operation operand1 operand2\nSupported operations: add, subtract, multiply, divide'

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
      exception: InvalidOperationException,
      testCaseId: 'LPC-502',
      featureId: 'SQUARE',
      epicId: 'CALCULATOR',
      severityLevel: SeverityLevel.CRITICAL
    })

    await expect(async () => await calculator.square(argument0))
      .rejects.toThrowError(InvalidOperationException)
  })

  test('[LPC-503]loanpro-calculator-cli square 16 → [InvalidOperationException]', async () => {
    let result: any;
    const argument0 = '16'
    const argument1 = ''
    const expected = 'Usage: cli-calculator operation operand1 operand2\nSupported operations: add, subtract, multiply, divide'

    try {
      result = await calculator.square(argument0)
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.SQUARE,
      argument0,
      argument1,
      received: result,
      expected,
      exception: InvalidOperationException,
      testCaseId: 'LPC-503',
      featureId: 'SQUARE',
      epicId: 'CALCULATOR',
      severityLevel: SeverityLevel.MINOR,
      tagsList: ["TODO"]
    })

    await expect(async () => await calculator.square(argument0))
      .rejects.toThrowError(InvalidOperationException)

    logger.success("Unknown Operation checked: square")
  })

  test('[LPC-504]loanpro-calculator-cli multiply 1000 20000000,000051 → Result: 20,000,000.051', async () => {

    let result: any;
    const argument0 = '1000'
    const argument1 = '20000000.000051'
    const expected = 'Result: 20,000,000,000.051'

    metadata({
      testCaseId: 'LPC-504',
      epicId: 'CALCULATOR',
      tagsList:['TODO']
    })

    try {
      const { output } = await executeCommand(
        `docker run --rm public.ecr.aws/l4q9w4c5/loanpro-calculator-cli ${CalculatorTask.MULTIPLY} ${argument0} ${argument1}`
      )
      result = output?.trim()
    } catch (err) {
      result = err?.message.trim()
    }

    tracking({
      operation: CalculatorTask.MULTIPLY,
      argument0,
      argument1,
      received: result,
      expected,
      info: 'Should be formatted to separate thousands',
    })

    expect(result).toBe(expected)
  })

  test('[LPC-505]loanpro-calculator-cli add 20 (10) → [InvalidOperationException]', async () => {

    let result: any;
    const argument0 = '20'
    const argument1 = '(10)'
    const expected = '30'

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
      testCaseId: 'LPC-504',
      featureId: 'ADD',
      epicId: 'CALCULATOR',
      severityLevel: SeverityLevel.CRITICAL
    })

    expect(result).toBe(expected)
  })

})
