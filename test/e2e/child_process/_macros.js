/**
 * @overview Provides AVA test macros for end-to-end tests of using Shescape
 * with child_process.
 * @license Unlicense
 */

import * as cp from "node:child_process";

import test from "ava";

import * as shescape from "../../../index.js";

/**
 * The spawn macro tests Shescape usage with {@link cp.spawn} for the provided
 * `options`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.spawnOptions The `options` for {@link cp.spawn}.
 */
export const spawn = test.macro({
  exec(t, spawnOptions) {
    t.plan(1);

    const benignInput = "foobar";
    const maliciousInput = "&& ls";
    const args = [benignInput, maliciousInput];

    const safeArgs = spawnOptions?.shell
      ? shescape.quoteAll(args, spawnOptions)
      : shescape.escapeAll(args, spawnOptions);

    return new Promise((resolve) => {
      const echo = cp.spawn("echo", safeArgs, spawnOptions);

      echo.on("close", resolve);

      echo.stdout.on("data", (data) => {
        const actual = `${data}`;
        const expected = `${benignInput} ${maliciousInput}\n`;
        t.is(actual, expected);
      });

      echo.on("error", (error) => {
        t.fail(`an unexpected error occurred: ${error}`);
      });
    });
  },
  title(_, spawnOptions) {
    const options = spawnOptions ? `, ${JSON.stringify(spawnOptions)}` : "";
    return `spawn(command, args${options})`;
  },
});

/**
 * The spawn macro tests Shescape usage with {@link cp.spawnSync} for the
 * provided `options`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.spawnOptions The `options` for {@link cp.spawnSync}.
 */
export const spawnSync = test.macro({
  exec(t, spawnOptions) {
    const benignInput = "foobar";
    const maliciousInput = "&& ls";
    const args = [benignInput, maliciousInput];

    const safeArgs = spawnOptions?.shell
      ? shescape.quoteAll(args, spawnOptions)
      : shescape.escapeAll(args, spawnOptions);

    const echo = cp.spawnSync("echo", safeArgs, spawnOptions);
    if (echo.error) {
      t.fail(`an unexpected error occurred: ${error}`);
    } else {
      const actual = `${echo.stdout}`;
      const expected = `${benignInput} ${maliciousInput}\n`;
      t.is(actual, expected);
    }
  },
  title(_, spawnOptions) {
    const options = spawnOptions ? `, ${JSON.stringify(spawnOptions)}` : "";
    return `spawnSync(command, args${options})`;
  },
});

/**
 * The execFile macro tests Shescape usage with {@link cp.execFile} for the
 * provided `options`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.execFileOptions The `options` for {@link cp.execFile}.
 */
export const execFile = test.macro({
  exec(t, execFileOptions) {
    t.plan(1);

    const benignInput = "foobar";
    const maliciousInput = "&& ls";
    const args = [benignInput, maliciousInput];

    const safeArgs = execFileOptions?.shell
      ? shescape.quoteAll(args, execFileOptions)
      : shescape.escapeAll(args, execFileOptions);

    return new Promise((resolve) => {
      cp.execFile("echo", safeArgs, execFileOptions, (error, stdout) => {
        if (error) {
          t.fail(`an unexpected error occurred: ${error}`);
        } else {
          const actual = `${stdout}`;
          const expected = `${benignInput} ${maliciousInput}\n`;
          t.is(actual, expected);
        }

        resolve();
      });
    });
  },
  title(_, execFileOptions) {
    const options = execFileOptions
      ? `, ${JSON.stringify(execFileOptions)}`
      : "";
    return `execFile(command, args${options})`;
  },
});

/**
 * The execFileSync macro tests Shescape usage with {@link cp.execFileSync} for
 * the provided `options`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.execFileOptions The `options` for {@link cp.execFileSync}.
 */
export const execFileSync = test.macro({
  exec(t, execFileOptions) {
    const benignInput = "foobar";
    const maliciousInput = "&& ls";
    const args = [benignInput, maliciousInput];

    const safeArgs = execFileOptions?.shell
      ? shescape.quoteAll(args, execFileOptions)
      : shescape.escapeAll(args, execFileOptions);

    try {
      const stdout = cp.execFileSync("echo", safeArgs, execFileOptions);
      const actual = `${stdout}`;
      const expected = `${benignInput} ${maliciousInput}\n`;
      t.is(actual, expected);
    } catch (error) {
      t.fail(`an unexpected error occurred: ${error}`);
    }
  },
  title(_, execFileOptions) {
    const options = execFileOptions
      ? `, ${JSON.stringify(execFileOptions)}`
      : "";
    return `execFileSync(command, args${options})`;
  },
});
