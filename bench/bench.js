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

suite.add(`unix, ${binBash}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(binBash, {
    interpolation: true,
  });
  escapeShellArg(sampleArg);
});

const escapeShellArgBashNew = unix.getEscapeFunction(binBash, {
  interpolation: true,
});
suite.add(`unix (new), ${binBash}, ${sampleArg}`, () => {
  escapeShellArgBashNew(sampleArg);
});

suite.add(`unix, ${binCsh}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(binCsh, {
    interpolation: true,
  });
  escapeShellArg(sampleArg);
});

const escapeShellArgCshNew = unix.getEscapeFunction(binCsh, {
  interpolation: true,
});
suite.add(`unix (new), ${binCsh}, ${sampleArg}`, () => {
  escapeShellArgCshNew(sampleArg);
});

suite.add(`unix, ${binDash}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(binDash, {
    interpolation: true,
  });
  escapeShellArg(sampleArg);
});

const escapeShellArgDashNew = unix.getEscapeFunction(binDash, {
  interpolation: true,
});
suite.add(`unix (new), ${binDash}, ${sampleArg}`, () => {
  escapeShellArgDashNew(sampleArg);
});

suite.add(`unix, ${binZsh}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(binZsh, {
    interpolation: true,
  });
  escapeShellArg(sampleArg);
});

const escapeShellArgZshNew = unix.getEscapeFunction(binZsh, {
  interpolation: true,
});
suite.add(`unix (new), ${binZsh}, ${sampleArg}`, () => {
  escapeShellArgZshNew(sampleArg);
});

suite.add(`win, ${binCmd}, ${sampleArg}`, () => {
  const escapeShellArg = win.getEscapeFunction(binCmd, {
    interpolation: true,
  });
  escapeShellArg(sampleArg);
});

const escapeShellArgCmdNew = win.getEscapeFunction(binCmd, {
  interpolation: true,
});
suite.add(`win (new), ${binCmd}, ${sampleArg}`, () => {
  escapeShellArgCmdNew(sampleArg);
});

suite.add(`win, ${binPowerShell}, ${sampleArg}`, () => {
  const escapeShellArg = win.getEscapeFunction(binPowerShell, {
    interpolation: true,
  });
  escapeShellArg(sampleArg);
});

const escapeShellArgPowerShellNew = win.getEscapeFunction(binPowerShell, {
  interpolation: true,
});
suite.add(`win (new), ${binPowerShell}, ${sampleArg}`, () => {
  escapeShellArgPowerShellNew(sampleArg);
});

suite.run();
