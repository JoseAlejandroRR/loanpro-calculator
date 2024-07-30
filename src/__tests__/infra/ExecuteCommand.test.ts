import { describe, expect } from '@jest/globals';
import commander from '../../infra/ExecuteCommand';
import { testLocal } from '../utils/utils';

describe('Runner Commander', () => {
 
  testLocal('RUN "ls" to check existents files', async () => {
    const { output } = await commander('ls')

    console.log("DEBUG_MODE NO DEBERIA APARECER")
    if (!output) {
      throw new Error("Can't read directory files.")
    }

    const lines = output.split("\n")

    expect(lines.includes('src')).toBe(true)
    expect(lines.includes('package.json')).toBe(true)
    expect(lines.includes('file-NOT-Exist.js')).toBe(false)
  })

  testLocal('RUN "lxs" to get "command not found"', async () => {
    const { error } = await commander('lxs')
    
    if (error) {
      expect(error).toContain('lxs: command not found')
    }
  })

  testLocal('RUN "pwd" to check directory', async () => {
    const { output } = await commander('pwd')

    if (!output) {
      throw new Error("Can't read directory files.")
    }

    const lines = output.split("\n")[0]

    expect(lines.includes('/loanpro-calculator')).toBe(true)
  })

})
