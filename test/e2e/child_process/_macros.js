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
