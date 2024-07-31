import { description, descriptionHtml, parameter, feature, epic, severity, issue, tags } from "allure-js-commons";

export enum SeverityLevel {
  NORMAL   = 'normal',
  MINOR    = 'minor',
  CRITICAL = 'critical',
  BLOCKER  = 'blocker',
}

export const TableTestDescription = (operation: string, argument0: string = "", argument1: string = "", expected: any, passed: boolean): string => `
  <table style="border-collapse: collapse; width: 100%; border: 1px solid #666; margin-bottom:20px;">
    <thead style="background-color: #2d2d2d; color: #ffffff;">
    <tr>
      <td style="padding: 10px;">Operation</td>
      <td style="padding: 10px;">Arg #0</td>
      <td style="padding: 10px;">Arg #1</td>
      <td style="padding: 10px;">Expected</td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td style="padding: 10px;">${operation}</td>
      <td style="padding: 10px;">${argument0}</td>
      <td style="padding: 10px;">${argument1}</td>
      <td style="padding: 10px; background-color: ${ passed ? '#4CAF50' : 'red'}; color: white;">${expected}</td>
    </tr>
    </tbody>
  </table>`


export const ShellComponent = (command: string): string => `
  <div class="shell" style="background-color: #2d2d2d; color: #ffffff; padding: 20px; border-radius: 5px; display: flex; align-items: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1); justify-content: space-between;">
  <div class="command" style="font-family: monospace; margin-right: 10px;">${command}</div>
  <button class="copy-btn" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;" onclick="const commandText = document.querySelector('.command').innerText; navigator.clipboard.writeText(commandText).then(() => { alert('Command copied to clipboard!'); }).catch(err => { alert('Failed to copy command: ' + err); });">Copy</button>
  </div>`;


export type TrackingParams = {
  operation: string,
  argument0?: string ,
  argument1?: string,
  received?: any,
  expected?: any,
  exception?: any,
  testCaseId?: string,
  featureId?: string;
  severityLevel?: string;
  epicId?: string;
  tagsList?: string[],
  info?: string,
}

export const tracking = (data: TrackingParams): void => {
  const { operation, argument0, argument1, received, expected, exception } = data
  const { testCaseId, featureId, severityLevel, epicId, tagsList, info } = data
  const receivedHTML = received !== expected ? `
  <p style="font-weight: bold; margin-bottom:20px;">
  Received: <span style="color:red;">${received}</span>
  </p>
  ` : '';

  const exceptionHTML = exception ? `
  <p style="font-weight: bold; margin-bottom:20px;">
  Exception: <span style="color:red;">${exception}</span>
  </p>
  ` : '';

  const extraHTML = info ? `
  <p style="font-weight: bold; margin-bottom:20px;">
  NOTE: <span style="">${info}</span>
  </p>
  ` : '';


  const command = `docker run --rm public.ecr.aws/l4q9w4c5/loanpro-calculator-cli ${operation} ${argument0} ${argument1}`
  
  severity(severityLevel ?? SeverityLevel.NORMAL)

  if(testCaseId) issue(`https://jira-domain.com/browse/${testCaseId}`)
  if(testCaseId) parameter('TestCaseId', testCaseId)
  if(featureId) feature(featureId)
  if(epicId) epic(epicId)
  if(tagsList) tags(...tagsList)
  
  descriptionHtml(`
    ${TableTestDescription(operation, argument0, argument1, expected, received === expected)}
    ${received === expected ? '' : receivedHTML} 
    ${exceptionHTML}
    ${extraHTML}
    ${ShellComponent(command)}
  `)
}

export type MetadataParamns = {
  testCaseId?: string,
  featureId?: string;
  severityLevel?: string;
  epicId?: string;
  tagsList?: string[],
  info?: string,
}

export const metadata = (data: MetadataParamns): void => {
  const { testCaseId, featureId, epicId, tagsList, info } = data
  if(testCaseId) issue(`https://jira-domain.com/browse/${testCaseId}`)
  if(testCaseId) parameter('TestCaseId', testCaseId)
  if(featureId) feature(featureId)
  if(epicId) epic(epicId)
  if(tagsList) tags(...tagsList)
  if(info) description(info)
}