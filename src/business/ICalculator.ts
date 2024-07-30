export enum CalculatorTask {
  ADD      = 'add',
  SUBTRACT = 'subtract',
  MULTIPLY = 'multiply',
  DIVIDE   = 'divide',
  SQUARE   = 'square',
}

interface ICalculator {

  add(a: number | string, b: number | string): Promise<number>

  subtract(a: number | string, b: number | string): Promise<number>

  multiply(a: number | string, b: number | string): Promise<number>

  divide(a: number | string, b: number | string): Promise<number>

  square(number: number | string): Promise<number>

}

export default ICalculator
