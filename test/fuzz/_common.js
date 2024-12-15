/**
 * @overview Provides utilities for fuzzing.
 * @license MIT
 */

import "dotenv/config";

import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";
import * as url from "node:url";

/**
 * Get the examples from the fuzz corpus.
 *
 * @returns {string[][]} The examples from the corpus.
 */
export function corpus() {
  const currentDir = path.dirname(url.fileURLToPath(new URL(import.meta.url)));
  const corpusDir = path.resolve(currentDir, "corpus");
  const files = fs.readdirSync(corpusDir);

  const corpus = [];
  for (const file of files) {
    const filepath = path.resolve(corpusDir, file);
    const example = fs.readFileSync(filepath, { encoding: "utf8" });
    corpus.push([example]);
  }

  return corpus;
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

  const parsed = Number.parseInt(iterations, 10);
  return parsed;
}
