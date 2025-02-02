import {describe, expect, test} from '@jest/globals';
import ICalculator, { CalculatorTask } from "../../business/ICalculator"
import LoadProCalculator from "../../infra/LoadProCalculator"
import { SeverityLevel, tracking } from '../utils/tracking';
import { logger } from '../../utils/Logger';

const DATA_TASKS = [
  // ADDITIONS 
  { task: CalculatorTask.ADD, a: "10", b: "5", expected: 15 },
  { task: CalculatorTask.ADD, a: "10", b: "5", expected: 15 },
  { task: CalculatorTask.ADD, a: "10", b: "0", expected: 10 },
  // Euler number
  { task: CalculatorTask.ADD, a: "e", b: "1", expected: 3.71828183 },
  // Trigonometrics
  { task: CalculatorTask.ADD, a: "sin(1)", b: "sin(1)", expected: "1.6829419696" },

  // SUBTRACTIONS 
  { task: CalculatorTask.SUBTRACT, a: "10", b: "5", expected: 5 },
  { task: CalculatorTask.SUBTRACT, a: "10", b: "0", expected: 10 },

  // MULTIPLY 
  { task: CalculatorTask.MULTIPLY, a: "7", b: "3", expected: 21 },
  { task: CalculatorTask.MULTIPLY, a: "12", b: "2", expected: 25 },
  { task: CalculatorTask.MULTIPLY, a: "12.5", b: "2", expected: 25 },

  // UNKOWN OPERATIONS
  { task: CalculatorTask.SQUARE, a: "64", b: "", expected: 8 },
]

describe('Random Tests', () => {

  let calculator: ICalculator;

  beforeAll(() => {
    calculator = new LoadProCalculator()
  })

  test.each(DATA_TASKS)(`loanpro-calculator-cli $task $a $b → $expected`, async (input) => {

    const { task, a, b, expected } = input
    let result: number | null = null

    if (task === CalculatorTask.ADD) {
      result = await calculator.add(a, b!)

    } else if (task === CalculatorTask.SUBTRACT) {
      result = await calculator.subtract(a, b!)

    } else if (task === CalculatorTask.MULTIPLY) {
      result = await calculator.multiply(a, b!)

    } else if (task === CalculatorTask.DIVIDE) {
      result = await calculator.divide(a, b!)

    } else {
      logger.warn(`[InvalidOperationException]: ${task}`)
    }

    tracking({
      operation: task,
      argument0: a,
      argument1: b,
      received: result,
      expected,
      featureId: task.toUpperCase(),
      epicId: 'CALCULATOR',
      severityLevel: SeverityLevel.NORMAL
    })

    expect(result).toEqual(expected)
  })

})
