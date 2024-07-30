import { exec } from "child_process"
import { logger } from "../utils/Logger";

export type CommandResult = {
  output: string | null;
  error:  string | null;
}

const executeCommand =  async(command: string, cwd: string = process.cwd()): Promise<CommandResult> => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      logger.debug(`[executeCommand]: ${command}`)
      
      if (error) {
        const messageError = stderr || stdout || error.message
        logger.error(messageError)
        resolve({ output: null, error: messageError })
      } else {
        logger.debug(stdout)
        resolve({ output: stdout, error: null })
      }
    })
  })
}

export default executeCommand
