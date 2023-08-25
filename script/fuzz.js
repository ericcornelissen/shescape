/**
 * Usage: `node script/fuzz.js <TARGET> [--fuzzTime=Xs]`.
 *
 * @overview Start fuzzing using a specific fuzz target.
 * @license MIT
 */

import "dotenv/config";

import fs from "node:fs";
import process from "node:process";

import { getFuzzShell } from "../test/fuzz/_common.js";
import * as common from "./_common.js";

const corpusDir = "./.corpus";
const fuzzTargetsDir = "./test/fuzz";
const testCasesDir = "./test/fuzz/corpus";

main(process.argv.slice(2));

function main(argv) {
  const fuzzShell = getFuzzShell();
  const fuzzTarget = getFuzzTarget(argv);
  const fuzzTime = getFuzzTime(argv);
  prepareCorpus();
  logFuzzDetails(fuzzShell, fuzzTarget, fuzzTime);
  startFuzzing(fuzzShell, fuzzTarget, fuzzTime);
}

function fuzzTargetToFuzzFile(target) {
  return `${fuzzTargetsDir}/${target}.test.cjs`;
}

function getFuzzTarget(argv) {
  if (argv.length === 0) {
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
    console.log();
    console.log("Use '--fuzzTime' to set the fuzz duration (in seconds)");
    console.log(`Example: 'npm run fuzz -- ${exampleTarget} --fuzzTime=10'`);

    process.exit(1);
  }

  const target = argv[0];
  const targetFile = fuzzTargetToFuzzFile(target);
  if (!fs.existsSync(targetFile)) {
    console.log(`Cannot find fuzz target "${targetFile}"`);
    process.exit(2);
  }

  return target;
}

function getFuzzTime(argv) {
  const fuzzTimeArg = argv.find((arg) => arg.startsWith("--fuzzTime"));
  const fuzzTimeEnv = process.env.FUZZ_TIME;
  if (fuzzTimeArg === undefined && fuzzTimeEnv === undefined) {
    return 0;
  }

  let timeInSeconds;
  if (fuzzTimeArg) {
    [, timeInSeconds] = fuzzTimeArg.split("=");
  } else {
    timeInSeconds = fuzzTimeEnv;
  }

  if (isNaN(parseInt(timeInSeconds))) {
    console.log("The --fuzzTime should be a numeric value (number of seconds)");
    console.log(`Got '${timeInSeconds}' instead`);

    process.exit(1);
  }

  return timeInSeconds;
}

function logFuzzDetails(shell, target, time) {
  console.log(
    "Will fuzz",
    time ? `for ${time} second(s)` : "forever",
    "using",
    shell === false ? "[no shell]" : shell === true ? "[default shell]" : shell,
    "as shell targeting",
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

function startFuzzing(shell, target, time) {
  const fuzz = common.npmRun([
    "exec",
    "jsfuzz",
    "--",
    fuzzTargetToFuzzFile(target),
    corpusDir,
    `--fuzzTime=${time}`,
  ]);

  fuzz.on("close", (code) => process.exit(code));
}
