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
  const escapeShellArg = unix.getEscapeFunction(binBash);
  escapeShellArg(sampleArg, { interpolation: false, quoted: false });
});

const escapeShellArgBashNew = unixNew.getEscapeFunction(binBash, {
  interpolation: false,
  quoted: false,
});
suite.add(`unix (new), ${binBash}, ${sampleArg}`, () => {
  escapeShellArgBashNew(sampleArg);
});

suite.add(`unix, ${binCsh}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(binCsh);
  escapeShellArg(sampleArg, { interpolation: false, quoted: false });
});

const escapeShellArgCshNew = unixNew.getEscapeFunction(binCsh, {
  interpolation: false,
  quoted: false,
});
suite.add(`unix (new), ${binCsh}, ${sampleArg}`, () => {
  escapeShellArgCshNew(sampleArg);
});

suite.add(`unix, ${binDash}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(binDash);
  escapeShellArg(sampleArg, { interpolation: false, quoted: false });
});

const escapeShellArgDashNew = unixNew.getEscapeFunction(binDash, {
  interpolation: false,
  quoted: false,
});
suite.add(`unix (new), ${binDash}, ${sampleArg}`, () => {
  escapeShellArgDashNew(sampleArg);
});

suite.add(`unix, ${binZsh}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(binZsh);
  escapeShellArg(sampleArg, { interpolation: false, quoted: false });
});

const escapeShellArgZshNew = unixNew.getEscapeFunction(binZsh, {
  interpolation: false,
  quoted: false,
});
suite.add(`unix (new), ${binZsh}, ${sampleArg}`, () => {
  escapeShellArgZshNew(sampleArg);
});

suite.add(`win, ${binCmd}, ${sampleArg}`, () => {
  const escapeShellArg = win.getEscapeFunction(binCmd);
  escapeShellArg(sampleArg, { interpolation: false, quoted: false });
});

suite.add(`win, ${binPowerShell}, ${sampleArg}`, () => {
  const escapeShellArg = win.getEscapeFunction(binPowerShell);
  escapeShellArg(sampleArg, { interpolation: false, quoted: false });
});

suite.run();
