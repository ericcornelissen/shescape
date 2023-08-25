/**
 * @overview Start fuzzing using a specific fuzz target.
 * @license MIT
 */

import "dotenv/config";

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { common, fuzz } from "./_.js";

const corpusDir = path.resolve(common.projectRoot, ".corpus/");
const fuzzTargetsDir = path.resolve(common.projectRoot, "test/fuzz/");
const testCasesDir = path.resolve(common.projectRoot, "test/fuzz/corpus");

if (common.argv.length === 0) {
  usage();
}

const fuzzShell = fuzz.getFuzzShell();
const fuzzTarget = common.argv[0];
const fuzzTime = process.env.FUZZ_TIME || 0;

if (!fs.existsSync(path.resolve(fuzzTargetsDir, `${fuzzTarget}.test.cjs`))) {
  console.log(`Cannot find fuzz target for "${fuzzTarget}"`);
  process.exit(2);
}

if (isNaN(parseInt(fuzzTime))) {
  console.log("The FUZZ_TIME should be a numeric value (number of seconds)");
  console.log(`Got '${fuzzTime}' instead`);
  process.exit(2);
}

prepareCorpus();
logDetails(fuzzShell, fuzzTarget, fuzzTime);
start(fuzzTarget, fuzzTime);

// -----------------------------------------------------------------------------

function logDetails(shell, target, time) {
  console.log(
    "Will fuzz",
    time ? `for ${time} second(s)` : "forever",
    "using",
    shell === false
      ? "no shell"
      : shell === true
      ? "the default system shell"
      : `${shell}`,
    "targeting",
    target,
    "\n",
  );
}

function prepareCorpus() {
  if (!fs.existsSync(corpusDir)) {
    fs.mkdirSync(corpusDir);
  }

  for (const entry of fs.readdirSync(testCasesDir)) {
    fs.copyFileSync(`${testCasesDir}/${entry}`, `${corpusDir}/${entry}`);
  }
}

function start(target, time) {
  const fuzz = common.npmRun([
    "exec",
    "jsfuzz",
    "--",
    `test/fuzz/${target}.test.cjs`,
    corpusDir,
    `--fuzzTime=${time}`,
  ]);

  fuzz.on("close", (code) => process.exit(code));
}

function usage() {
  const availableTargets = fs
    .readdirSync(fuzzTargetsDir)
    .filter((fileName) => fileName.endsWith(".test.cjs"))
    .map((fileName) => fileName.replace(".test.cjs", ""));
  const exampleTarget = availableTargets[0];

  console.log("Provide a fuzz target. Available targets:");
  for (const target of availableTargets) {
    console.log(`- '${target}'`);
  }
  console.log();
  console.log(`Example: 'npm run fuzz -- ${exampleTarget}'`);

  process.exit(1);
}
