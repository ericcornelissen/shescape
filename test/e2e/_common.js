/**
 * @overview Provides common utilities for end-to-end tests.
 * @license MIT
 */

import path from "node:path";
import process from "node:process";

import { isCI } from "ci-info";
import which from "which";

import * as constants from "../_constants.js";

/**
 * Get a list of strings to use as arguments in end-to-end tests.
 *
 * @returns {string[]} A list of test arguments.
 */
export function getTestArgs() {
  const unixTestArgs = [
    "harmless",
    "\u0000world",
    "&& ls",
    "'; ls #",
    '"; ls #',
    "$PATH",
    "~",
    ":~",
  ];

  const windowsTestArgs = [
    "harmless",
    "\u0000world",
    "&& ls",
    "'; ls #",
    '"; ls #',
    "$PATH",
    "$Env:PATH",
    "%PATH%",
    "!PATH!",
  ];

  return constants.isWindows ? windowsTestArgs : unixTestArgs;
}

/**
 * Check whether the shell should be skipped.
 *
 * @param {string} shell The shell of interest.
 * @returns {string | false} A skip reason or false.
 */
export function skip(shell) {
  if (isCI) {
    return false;
  }

  if (typeof shell !== "string") {
    return false;
  }

  const PATH = process.env.PATH || process.env.Path;
  try {
    which.sync(shell, { path: PATH });
    return false;
  } catch {
    return `${shell} not installed`;
  }
}

/**
 * Get a list of `shell` option values to use in end-to-end tests.
 *
 * @returns {(boolean | string)[]} A list of `shell` option values.
 */
export function getTestShells() {
  const temp = path.resolve(import.meta.dirname, "..", "..", ".temp");
  const systemShells = constants.isWindows
    ? constants.shellsWindows
    : constants.shellsUnix;

  const shells = [false, ...systemShells];

  const busyboxIndex = shells.indexOf(constants.binBusyBox);
  if (busyboxIndex !== -1) {
    if (constants.isMacOS) {
      shells.splice(busyboxIndex, 1);
    } else {
      shells[busyboxIndex] = path.resolve(temp, "busybox", "sh");
    }
  }

  if (constants.isLinux) {
    const doubleLinkedShell = path.resolve(temp, "double-link", "link-to-link");
    shells.push(doubleLinkedShell);
  }

  if (!constants.isMacOS) {
    shells.push(true);
  }

  return shells;
}
