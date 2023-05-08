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
import * as unixNew from "../src/unix/index.js";
import * as win from "../src/win.js";

const sampleArg = "foobar";

const suite = new Benchmark.Suite("escapeShellArg", {
  onCycle: (event) => {
    const fn = event.currentTarget.name;
    const cycleResult = event.target.toString();
    console.log(fn, "-", cycleResult);
  },
});

suite.add(`unix, ${binBash}, ${sampleArg}`, () => {
  const escapeShellArgBash = unix.getEscapeFunction(binBash);
  escapeShellArgBash(sampleArg, { interpolation: false, quoted: false });
});

const escapeShellArgBashNew = unixNew.getEscapeFunction(binBash, {
  interpolation: false,
  quoted: false,
});
suite.add(`unix (new), ${binBash}, ${sampleArg}`, () => {
  escapeShellArgBashNew(sampleArg);
});

suite.add(`unix, ${binCsh}, ${sampleArg}`, () => {
  const escapeShellArgCsh = unix.getEscapeFunction(binCsh);
  escapeShellArgCsh(sampleArg, { interpolation: false, quoted: false });
});

const escapeShellArgCshNew = unixNew.getEscapeFunction(binCsh, {
  interpolation: false,
  quoted: false,
});
suite.add(`unix (new), ${binCsh}, ${sampleArg}`, () => {
  escapeShellArgCshNew(sampleArg);
});

suite.add(`unix, ${binDash}, ${sampleArg}`, () => {
  const escapeShellArgDash = unix.getEscapeFunction(binDash);
  escapeShellArgDash(sampleArg, { interpolation: false, quoted: false });
});

const escapeShellArgDashNew = unixNew.getEscapeFunction(binDash, {
  interpolation: false,
  quoted: false,
});
suite.add(`unix (new), ${binDash}, ${sampleArg}`, () => {
  escapeShellArgDashNew(sampleArg);
});

suite.add(`unix, ${binZsh}, ${sampleArg}`, () => {
  const escapeShellArgZsh = unix.getEscapeFunction(binZsh);
  escapeShellArgZsh(sampleArg, { interpolation: false, quoted: false });
});

const escapeShellArgZshNew = unixNew.getEscapeFunction(binZsh, {
  interpolation: false,
  quoted: false,
});
suite.add(`unix (new), ${binZsh}, ${sampleArg}`, () => {
  escapeShellArgZshNew(sampleArg);
});

suite.add(`win, ${binCmd}, ${sampleArg}`, () => {
  const escapeShellArgCmd = win.getEscapeFunction(binCmd);
  escapeShellArgCmd(sampleArg, { interpolation: false, quoted: false });
});

suite.add(`win, ${binPowerShell}, ${sampleArg}`, () => {
  const escapeShellArgPowerShell = win.getEscapeFunction(binPowerShell);
  escapeShellArgPowerShell(sampleArg, { interpolation: false, quoted: false });
});

suite.run();
