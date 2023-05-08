/**
 * @overview A benchmark suite for comparing performance.
 * @license MIT
 */

import Benchmark from "benchmark";

import { binBash, binCsh, binDash, binZsh } from "../test/_constants.cjs";

import * as unix from "../src/unix.js";
import * as unixNew from "../src/unix/index.js";

const targetShell = binBash;
const targetOptions = {
  interpolation: false,
  quoted: false,
};
const sampleArg = "foobar";

const suite = new Benchmark.Suite("escapeShellArg", {
  onCycle: (event) => {
    const fn = event.currentTarget.name;
    const cycleResult = event.target.toString();
    console.log(fn, "-", cycleResult);
  },
});

const escapeArg = unix.getEscapeFunction(targetShell);
suite.add(`shell=${targetShell}, arg=${sampleArg}`, () => {
  escapeArg(sampleArg, targetOptions);
});

const escapeArgNew = unixNew.getEscapeFunction(targetShell, targetOptions);
suite.add(`(new) shell=${targetShell}, arg=${sampleArg}`, () => {
  escapeArgNew(sampleArg);
});

suite.on("complete", function () {
  console.log("Fastest is " + this.filter("fastest").map("name"));
});

suite.run();
