/**
 * @overview Prepares the corpus for fuzzing.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fs from "node:fs";

import { getFuzzShell } from "../test/fuzz/exec.test.cjs";

const corpusDir = "./.corpus";
const testCasesDir = "./test/fuzz/corpus";

if (!fs.existsSync(corpusDir)) {
  fs.mkdirSync(corpusDir);
}

for (const entry of fs.readdirSync(testCasesDir)) {
  fs.copyFileSync(`${testCasesDir}/${entry}`, `${corpusDir}/${entry}`);
}

console.log("\n");
console.log(`Fuzzing will use ${getFuzzShell() || "[default shell]"} as shell`);
