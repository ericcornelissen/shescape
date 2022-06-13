/**
 * @overview Start fuzzing using a specific fuzz target. Use the first argument
 * to specify the fuzz target, for example: `npm run fuzz exec`.
 * @license Unlicense
 */

import * as cp from "node:child_process";
import * as fs from "node:fs";
import * as process from "node:process";

import { getFuzzShell } from "../test/fuzz/_common.cjs";

const corpusDir = "./.corpus";
const fuzzTargetsDir = "./test/fuzz";
const testCasesDir = "./test/fuzz/corpus";

main(process.argv.slice(2));

function main(argv) {
  const fuzzTarget = getFuzzTarget(argv);
  prepareCorpus();
  logShellToFuzz();
  startFuzzing(fuzzTarget);
}

function getFuzzTarget(argv) {
  if (argv.length === 0) {
    const availableTargets = fs
      .readdirSync(fuzzTargetsDir)
      .filter((fileName) => fileName.endsWith(".test.cjs"))
      .map((fileName) => fileName.replace(".test.cjs", ""));

    console.log("Provide a fuzz target. Available targets:");
    for (const target of availableTargets) {
      console.log(`- '${target}'`);
    }
    console.log("\n", `Example: 'npm run fuzz -- ${availableTargets[0]}'`);

    process.exit(1);
  }

  const target = `${fuzzTargetsDir}/${argv[0]}.test.cjs`;
  if (!fs.existsSync(target)) {
    console.log(`Cannot find fuzz target "${target}"`);
    process.exit(2);
  }

  return target;
}

function logShellToFuzz() {
  console.log(
    `Fuzzing will use ${getFuzzShell() || "[default shell]"} as shell`
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

function startFuzzing(target) {
  const fuzz = cp.spawn("jsfuzz", [target, corpusDir], {
    stdio: ["inherit", "inherit", "inherit"],
    shell: true,
  });

  fuzz.on("close", (code) => process.exit(code));
}
