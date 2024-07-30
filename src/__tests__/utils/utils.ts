import { test, xtest } from '@jest/globals';
import type { Global } from '@jest/types';

export const debugMode = process.env.NODE_ENV === "automation"

export const testIf = (condition: boolean, testName: string, fn: Global.TestFn) => condition ? test(testName, fn) : xtest(testName, fn)

export const testLocal = (testName: string, fn: Global.TestFn) => testIf(debugMode, testName, fn)