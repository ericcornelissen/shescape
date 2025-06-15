/**
 * @overview Provides common utilities for end-to-end tests.
 * @license MIT
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import test from "ava";
import isCI from "is-ci";
import which from "which";

import { injectionStrings } from "../../src/modules/testing.js";
import * as constants from "../_constants.js";

/**
 * Get a list of strings to use as arguments in end-to-end tests.
 *
 * @returns {string[]} A list of test arguments.
 */
export function getTestArgs() {
  return ["harmless", ...injectionStrings];
}

/**
 * Get the AVA test function to use for the given shell.
 *
 * @param {string} shell The shell to run a test for.
 * @returns {Function} An AVA `test` function.
 */
export function getTestFn(shell) {
  try {
    if (!isCI && typeof shell === "string") {
      locate(shell);
    }

    return test;
  } catch {
    return test.skip;
  }
}

/**
 * Get a list of `shell` option values to use in end-to-end tests.
 *
 * @returns {(boolean | string)[]} A list of `shell` option values.
 */
export function getTestShells() {
  const systemShells = constants.isWindows
    ? constants.shellsWindows
    : constants.shellsUnix;

  const busyboxIndex = systemShells.indexOf(constants.binBusyBox);
  if (busyboxIndex !== -1) {
    systemShells[busyboxIndex] = createBusyBoxSh();
  }

  return [false, ...systemShells];
}

/**
 * Create a link file called "sh" to BusyBox so that it can be used as a shell.
 *
 * @returns {string} The location of the sh file linking to BusyBox.
 */
export function createBusyBoxSh() {
  const root = path.resolve(import.meta.dirname, "..", "..");
  const temp = path.resolve(root, ".temp", "busybox");
  if (!fs.existsSync(temp)) {
    fs.mkdirSync(temp, { recursive: true });
  }

  const busyboxSh = path.resolve(temp, "sh");
  if (!fs.existsSync(busyboxSh)) {
    try {
      const busybox = locate(constants.binBusyBox);
      fs.symlinkSync(busybox, busyboxSh);
    } catch {
      return constants.binBusyBox;
    }
  }

  return busyboxSh;
}

/**
 * Obtain the location of a binary on the system by name.
 *
 * @param {string} binary The name of the binary to location.
 * @returns {string} The path to the binary.
 */
function locate(binary) {
  return which.sync(binary, { path: process.env.PATH || process.env.Path });
}
