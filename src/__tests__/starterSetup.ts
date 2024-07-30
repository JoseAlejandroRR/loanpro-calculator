import fs from 'fs';
import path from 'path';
import executeCommand from "../infra/ExecuteCommand"
import { logger } from "../utils/Logger";
import { rimraf } from "rimraf"

const resultsDir = path.resolve(__dirname, './../../allure-results');
const categoriesFile = path.join(resultsDir, 'categories.json');

const categoriesJSON = [
  {
    "name": "Failed Tests [High Priority]",
    "matchedStatuses": ["failed"]
  },
  {
    "name": "Broken Tests [MAX Priority]",
    "matchedStatuses": ["broken"]
  }
]

const cleanAllure = async () => {
  try {
    const folderExist = await fs.existsSync(resultsDir)
    if (folderExist) await rimraf(resultsDir)
  } catch (err) {
    logger.error(`Error deleting allure-results directory: ${err.message}`)
    process.exit(1);
  }

  fs.mkdir(resultsDir, { recursive: true }, (err) => {
    if (err) {
      logger.error('Error creating allure-results directory:')
      process.exit(1)
    }

    if (!fs.existsSync(categoriesFile)) {
      fs.writeFile(categoriesFile, JSON.stringify(categoriesJSON), (err) => {
        if (err) {
          logger.error('Error creating categories.json file')
          process.exit(1)
        } else {
          logger.info('[cleanAllure] categories.json file created successfully.')
        }
      })
    }
  })
}

export default async () => {
  await executeCommand('docker pull public.ecr.aws/l4q9w4c5/loanpro-calculator-cli:latest')
  await cleanAllure()
}
