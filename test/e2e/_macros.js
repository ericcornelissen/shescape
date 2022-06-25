/**
 * @overview Provides AVA test macros for end-to-end tests of using Shescape
 * with child_process.
 * @license Unlicense
 */

import * as cp from "node:child_process";

import test from "ava";

import * as constants from "../_constants.cjs";

import * as shescape from "../../index.js";

/**
 * The exec macro tests Shescape usage with {@link cp.exec} for the provided
 * `options`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.arg The argument to test with.
 * @param {Object} args.options The `options` for {@link cp.exec}.
 */
export const exec = test.macro({
  exec(t, args) {
    t.plan(1);

    const execOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;

    const safeArg = shescape.quote(maliciousInput, execOptions);

    return new Promise((resolve) => {
      cp.exec(
        `node ${constants.echoScript} ${benignInput} ${safeArg}`,
        execOptions,
        (error, stdout) => {
          if (error) {
            t.fail(`an unexpected error occurred: ${error}`);
          } else {
            const actual = `${stdout}`;
            const expected = `${benignInput} ${maliciousInput}\n`;
            t.is(actual, expected);
          }

          resolve();
        }
      );
    });
  },
  title(_, args) {
    const arg = args.arg;
    const options = args.options ? `, ${JSON.stringify(args.options)}` : "";
    return `exec(command + "${arg}"${options}, callback)`;
  },
});

/**
 * The execSync macro tests Shescape usage with {@link cp.execSync} for the
 * provided `options`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.arg The argument to test with.
 * @param {Object} args.options The `options` for {@link cp.execSync}.
 */
export const execSync = test.macro({
  exec(t, args) {
    const execOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;

    const safeArg = shescape.quote(maliciousInput, execOptions);

    try {
      const stdout = cp.execSync(
        `node ${constants.echoScript} ${benignInput} ${safeArg}`,
        execOptions
      );
      const actual = `${stdout}`;
      const expected = `${benignInput} ${maliciousInput}\n`;
      t.is(actual, expected);
    } catch (error) {
      t.fail(`an unexpected error occurred: ${error}`);
    }
  },
  title(_, args) {
    const arg = args.arg;
    const options = args.options ? `, ${JSON.stringify(args.options)}` : "";
    return `execSync(command + "${arg}"${options})`;
  },
});

/**
 * The execFile macro tests Shescape usage with {@link cp.execFile} for the
 * provided `options`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.arg The argument to test with.
 * @param {Object} args.options The `options` for {@link cp.execFile}.
 */
export const execFile = test.macro({
  exec(t, args) {
    t.plan(1);

    const execFileOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;
    const unsafeArgs = [constants.echoScript, benignInput, maliciousInput];

    const safeArgs = execFileOptions?.shell
      ? shescape.quoteAll(unsafeArgs, execFileOptions)
      : shescape.escapeAll(unsafeArgs, execFileOptions);

    return new Promise((resolve) => {
      cp.execFile("node", safeArgs, execFileOptions, (error, stdout) => {
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
  title(_, args) {
    const arg = args.arg;
    const options = args.options ? `, ${JSON.stringify(args.options)}` : "";
    return `execFile(command, "${arg}"${options}, callback)`;
  },
});

/**
 * The execFileSync macro tests Shescape usage with {@link cp.execFileSync} for
 * the provided `options`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.arg The argument to test with.
 * @param {Object} args.options The `options` for {@link cp.execFileSync}.
 */
export const execFileSync = test.macro({
  exec(t, args) {
    const execFileOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;
    const unsafeArgs = [constants.echoScript, benignInput, maliciousInput];

    const safeArgs = execFileOptions?.shell
      ? shescape.quoteAll(unsafeArgs, execFileOptions)
      : shescape.escapeAll(unsafeArgs, execFileOptions);

    try {
      const stdout = cp.execFileSync("node", safeArgs, execFileOptions);
      const actual = `${stdout}`;
      const expected = `${benignInput} ${maliciousInput}\n`;
      t.is(actual, expected);
    } catch (error) {
      t.fail(`an unexpected error occurred: ${error}`);
    }
  },
  title(_, args) {
    const arg = args.arg;
    const options = args.options ? `, ${JSON.stringify(args.options)}` : "";
    return `execFileSync(command, "${arg}"${options})`;
  },
});

/**
 * The fork macro tests Shescape usage with {@link cp.fork} for the provided
 * `options`.
 *
 * NOTE: `options.silent` is always set to `true`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.arg The argument to test with.
 * @param {Object} args.options The `options` for {@link cp.fork}.
 */
export const fork = test.macro({
  exec(t, args) {
    t.plan(1);

    const forkOptions = {
      ...args.options,
      silent: true, // Must be set to ensure stdout is available in the test
    };

    const benignInput = "foobar";
    const maliciousInput = args.arg;
    const unsafeArgs = [benignInput, maliciousInput];

    const safeArgs = shescape.escapeAll(unsafeArgs, forkOptions);

    return new Promise((resolve) => {
      const echo = cp.fork(constants.echoScript, safeArgs, forkOptions);

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
  title(_, args) {
    const arg = args.arg;
    const options = args.options ? `, ${JSON.stringify(args.options)}` : "";
    return `fork(modulePath, "${arg}"${options})`;
  },
});

/**
 * The spawn macro tests Shescape usage with {@link cp.spawn} for the provided
 * `options`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.arg The argument to test with.
 * @param {Object} args.options The `options` for {@link cp.spawn}.
 */
export const spawn = test.macro({
  exec(t, args) {
    t.plan(1);

    const spawnOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;
    const unsafeArgs = [constants.echoScript, benignInput, maliciousInput];

    const safeArgs = spawnOptions?.shell
      ? shescape.quoteAll(unsafeArgs, spawnOptions)
      : shescape.escapeAll(unsafeArgs, spawnOptions);

    return new Promise((resolve) => {
      const echo = cp.spawn("node", safeArgs, spawnOptions);

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
  title(_, args) {
    const arg = args.arg;
    const options = args.options ? `, ${JSON.stringify(args.options)}` : "";
    return `spawn(command, "${arg}"${options})`;
  },
});

/**
 * The spawn macro tests Shescape usage with {@link cp.spawnSync} for the
 * provided `options`.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.arg The argument to test with.
 * @param {Object} args.options The `options` for {@link cp.spawnSync}.
 */
export const spawnSync = test.macro({
  exec(t, args) {
    const spawnOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;
    const unsafeArgs = [constants.echoScript, benignInput, maliciousInput];

    const safeArgs = spawnOptions?.shell
      ? shescape.quoteAll(unsafeArgs, spawnOptions)
      : shescape.escapeAll(unsafeArgs, spawnOptions);

    const echo = cp.spawnSync("node", safeArgs, spawnOptions);
    if (echo.error) {
      t.fail(`an unexpected error occurred: ${error}`);
    } else {
      const actual = `${echo.stdout}`;
      const expected = `${benignInput} ${maliciousInput}\n`;
      t.is(actual, expected);
    }
  },
  title(_, args) {
    const arg = args.arg;
    const options = args.options ? `, ${JSON.stringify(args.options)}` : "";
    return `spawnSync(command, "${arg}"${options})`;
  },
});
