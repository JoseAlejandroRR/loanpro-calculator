import ICalculator, { CalculatorTask } from "../business/ICalculator";
import DivideByZeroException from "../business/exceptions/DivideByZeroException";
import Exception from "../business/exceptions/Exception";
import InvalidArgumentException from "../business/exceptions/InvalidArgumentException";
import InvalidOperationException from "../business/exceptions/InvalidOperationException";
import executeCommand from "./ExecuteCommand";

class LoadProCalculator implements ICalculator {

	async add(a: number, b: number): Promise<number> {
		const result = await this.calculate(CalculatorTask.ADD, a, b)
		return result
	}

	async subtract(a: number, b: number): Promise<number> {
		const result = await this.calculate(CalculatorTask.SUBTRACT, a, b)
		return result
	}

	async multiply(a: number, b: number): Promise<number> {
		const result = await this.calculate(CalculatorTask.MULTIPLY, a, b)
		return result
	}

	async divide(a: number, b: number): Promise<number> {
		const result = await this.calculate(CalculatorTask.DIVIDE, a, b)
		return result
	}

	async square(number: number): Promise<number> {
		const result = await this.calculate(CalculatorTask.SQUARE, number)
		return result
	}

	private async calculate(task: CalculatorTask, a: number | string, b?: number | string ): Promise<number> {
		const { output, error } = await executeCommand(`docker run --rm public.ecr.aws/l4q9w4c5/loanpro-calculator-cli ${task} ${a} ${b ?? ''}`)

		if (output || error) {
			const err =  output ?? error

			if (/Unknown operation/.test(err!) || /Supported operations/.test(err!)) {
				throw new InvalidOperationException(err!)
			}

			if (/Invalid argument/.test(err!)) {
				throw new InvalidArgumentException(err!)
			}

			if (/unknown file attribute/.test(err!)) {
				throw new InvalidArgumentException(err!)
			}

			if (/Cannot divide by zero/.test(err!)) {
				throw new DivideByZeroException(err!)
			}

			if (/syntax error/.test(err!)) {
				throw new Exception(err!)
			}
		}

		if (!output) {
			return NaN
		}

		let value: string | null = null;

		if (/Result:/.test(output)) {
			value = output.substring(7).trim()
		}

		if (value === null) return NaN
		const numberResult = Number(value)

		if (isNaN(numberResult)) return NaN

		return numberResult
	}
}

export default LoadProCalculator
