import pino from "pino";

const { NODE_ENV } = process.env

const isAutomationMode = NODE_ENV === 'automation'

enum COLORS {
  RED = 31,
  GREEN = 32,
  YELLOW = 33,
  BLUE = 34,
  CYAN = 36,
}

class Logger {

  private debugMode:boolean = false

  constructor(debugMode: boolean) {
    this.debugMode = debugMode
  }

  debug(text: string): void {
    if (!this.debugMode) return
    console.log(`\x1b[${COLORS.CYAN}m ${text} \x1b[0m`)
  }

  info(text: string): void {
    console.log(`\x1b[${COLORS.BLUE}m ${text} \x1b[0m`)
  }

  error(text: string): void {
    console.log(`\x1b[${COLORS.RED}m ${text} \x1b[0m`)
  }

  success(text: string): void {
    console.log(`\x1b[${COLORS.GREEN}m ${text} \x1b[0m`)
  }

  warn(text: string): void {
    console.log(`\x1b[${COLORS.YELLOW}m ${text} \x1b[0m`)
  }
}

//console.log("CHECKING CONFIG: ",NODE_ENV,  isAutomationMode, isAutomationMode ? 'debug' : 'info')
/*
export const logger = pino({
  name: 'loadpro-calculator',
  level: isAutomationMode ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});*/

export const logger = new Logger(isAutomationMode)
