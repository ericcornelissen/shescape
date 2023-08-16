/**
 * @overview A benchmark suite for detecting performance regression.
 * @license MIT
 */

import Benchmark from "benchmark";

import {
  binBash,
  binCmd,
  binCsh,
  binDash,
  binPowerShell,
  binZsh,
} from "../test/_constants.cjs";

import * as unix from "../src/unix.js";
import * as win from "../src/win.js";

const sampleArg = "foobar";

const suite = new Benchmark.Suite("escapeShellArg", {
  onCycle: (event) => {
    const fn = event.currentTarget.name;
    const cycleResult = event.target.toString();
    console.log(fn, "-", cycleResult);
  },
});

const escapeShellArgNoShellUnix = unix.getEscapeFunction(null);
suite.add(`unix, no shell, ${sampleArg}`, () => {
  escapeShellArgNoShellUnix(sampleArg);
});

const escapeShellArgBash = unix.getEscapeFunction(binBash);
suite.add(`unix, ${binBash}, ${sampleArg}`, () => {
  escapeShellArgBash(sampleArg);
});

const escapeShellArgCsh = unix.getEscapeFunction(binCsh);
suite.add(`unix, ${binCsh}, ${sampleArg}`, () => {
  escapeShellArgCsh(sampleArg);
});

const escapeShellArgDash = unix.getEscapeFunction(binDash);
suite.add(`unix, ${binDash}, ${sampleArg}`, () => {
  escapeShellArgDash(sampleArg);
});

const escapeShellArgZsh = unix.getEscapeFunction(binZsh);
suite.add(`unix, ${binZsh}, ${sampleArg}`, () => {
  escapeShellArgZsh(sampleArg);
});

const escapeShellArgNoShellWin = win.getEscapeFunction(null);
suite.add(`win, no shell, ${sampleArg}`, () => {
  escapeShellArgNoShellWin(sampleArg);
});

const escapeShellArgCmd = win.getEscapeFunction(binCmd);
suite.add(`win, ${binCmd}, ${sampleArg}`, () => {
  escapeShellArgCmd(sampleArg);
});

const escapeShellArgPowerShell = win.getEscapeFunction(binPowerShell);
suite.add(`win, ${binPowerShell}, ${sampleArg}`, () => {
  escapeShellArgPowerShell(sampleArg);
});

suite.run();
