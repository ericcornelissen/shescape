/**
 * @overview Provides utilities for fuzzing.
 * @license MIT
 */

import "dotenv/config";

import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";

import { bash } from "@ericcornelissen/arbitrary-bash";
import fc from "fast-check";

/**
 * Create a fast-check arbitrary that generates shell argument.
 *
 * @returns {string} Arbitrary shell arguments.
 */
export function arbitaryArg() {
  const arbitraries = [fc.string()];

  const shell = getFuzzShell();
  if (shell) {
    switch (true) {
      case shell.endsWith("bash"): {
        arbitraries.push(bash());
        break;
      }
    }
  }

  return fc.oneof(...arbitraries);
}

/**
 * Get the examples from the fuzz corpus.
 *
 * @returns {string[][]} The examples from the corpus.
 */
export function corpus() {
  const corpusDirectory = getCorpusLocation();
  const files = fs.readdirSync(corpusDirectory);

  const entries = [];
  for (const file of files) {
    const filepath = path.resolve(corpusDirectory, file);
    const example = fs.readFileSync(filepath, { encoding: "utf8" });
    entries.push([example]);
  }

  return entries;
}

/**
 * Add a new entry to the corpus.
 *
 * @param {string} value The value to add to the corpus.
 */
export function extendCorpus(value) {
  const corpusDirectory = getCorpusLocation();
  const filename = hash(value);
  const filepath = path.join(corpusDirectory, filename);
  fs.writeFileSync(filepath, value, { encoding: "utf8" });
}

/**
 * Returns the shell configured to be used for fuzzing.
 *
 * @returns {string | boolean} The configured shell.
 */
export function getFuzzShell() {
  const shell = process.env.FUZZ_SHELL;
  switch (shell) {
    case undefined:
    case "false":
    case "": {
      return false;
    }
    case "true": {
      return true;
    }
    default: {
      return shell;
    }
  }
}

/**
 * Returns the number of iterations configured to be used for fuzzing.
 *
 * @returns {number} The configured number of iterations.
 */
export function getIterations() {
  const iterations = process.env.FUZZ_ITERATIONS;
  if (iterations === undefined) {
    return Infinity;
  }

  const parsed = Number(iterations);
  return parsed;
}

/**
 * Get the location of the fuzz corpus on the file system.
 *
 * @returns {string} The path to the fuzz corpus.
 */
function getCorpusLocation() {
  const currentDirectory = import.meta.dirname;
  const corpusDirectory = path.resolve(currentDirectory, "corpus");
  return corpusDirectory;
}

/**
 * Return the hex-encoded hash of a value.
 *
 * @param {string} value The value to hash.
 * @returns {string} The hash of the value.
 */
function hash(value) {
  const hasher = crypto.createHash("sha256");
  hasher.update(value);
  const valueHash = hasher.digest("hex");
  return valueHash;
}
