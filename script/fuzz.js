/**
 * @overview Start fuzzing using a specific fuzz target. Use the first argument
 * to specify the fuzz target, for example: `npm run fuzz exec`.
 * @license MIT
 */

import * as cp from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as process from "node:process";

import { getFuzzShell } from "../test/fuzz/_common.cjs";

const corpusDir = "./.corpus";
const fuzzTargetsDir = "./test/fuzz";
const testCasesDir = "./test/fuzz/corpus";

main(process.argv.slice(2));

function main(argv) {
  const fuzzTarget = getFuzzTarget(argv);
  const fuzzTime = getFuzzTime(argv);
  prepareCorpus();
  logShellToFuzz();
  startFuzzing(fuzzTarget, fuzzTime);
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

  const target = `${fuzzTargetsDir}/${argv[0]}.test.cjs`;
  if (!fs.existsSync(target)) {
    console.log(`Cannot find fuzz target "${target}"`);
    process.exit(2);
  }

  return target;
}

function getFuzzTime(argv) {
  const fuzzTimeArg = argv.find((arg) => arg.startsWith("--fuzzTime"));
  if (fuzzTimeArg === undefined) {
    return 0;
  }

  const [, timeInSeconds] = fuzzTimeArg.split("=");
  if (isNaN(parseInt(timeInSeconds))) {
    console.log("The --fuzzTime should be a numeric value (number of seconds)");
    console.log(`Got '${timeInSeconds}' instead`);

    process.exit(1);
  }

  return timeInSeconds;
}

function logShellToFuzz() {
  console.log(
    `Fuzzing will use ${getFuzzShell() || "[default shell]"} as shell`,
  );
  console.log("\n");
}

function prepareCorpus() {
  if (!fs.existsSync(corpusDir)) {
    fs.mkdirSync(corpusDir);
  }

  for (const entry of fs.readdirSync(testCasesDir)) {
    fs.copyFileSync(`${testCasesDir}/${entry}`, `${corpusDir}/${entry}`);
  }
}

function startFuzzing(target, time) {
  const fuzz = cp.spawn(
    os.platform() === "win32" ? "npm.cmd" : "npm",
    ["exec", "jsfuzz", "--", target, corpusDir, `--fuzzTime=${time}`],
    { stdio: "inherit" },
  );

  fuzz.on("close", (code) => process.exit(code));
}
