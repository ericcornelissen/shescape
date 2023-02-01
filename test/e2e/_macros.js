/**
 * @overview Provides AVA test macros for end-to-end tests of using Shescape
 * with child_process.
 * @license Unlicense
 */

import * as cp from "node:child_process";

import test from "ava";
import isCI from "is-ci";

/* eslint-disable ava/no-import-test-files */
import * as execFileTest from "../fuzz/exec-file.test.cjs";
import * as execTest from "../fuzz/exec.test.cjs";
import * as forkTest from "../fuzz/fork.test.cjs";
import * as spawnTest from "../fuzz/spawn.test.cjs";
/* eslint-enable ava/no-import-test-files */

/**
 * Converts a test function into a test function that catches and discards some
 * errors that are allowed during testing.
 *
 * In particular:
 * - Allows for ENOENT errors when run outside a CI. This allows for running the
 * e2e tests locally even if you don't have all shells installed.
 *
 * @param {Function} cb The function to run and handle errors for.
 * @returns {Function} A callback that will safely handle some errors.
 */
const tryRun = (cb) => {
  const handleError = (error) => {
    if (!isCI) {
      if (error.code === "ENOENT" || error.toString().includes("ENOENT")) {
        return;
      }
    }

    throw error;
  };

  return () => {
    try {
      const result = cb();
      if (result instanceof Promise) {
        // Catch asynchronous errors
        return result.catch(handleError);
      }

      return result;
    } catch (error) {
      // Catch synchronous errors
      handleError(error);
    }
  };
};

/**
 * The exec macro tests Shescape usage with {@link cp.exec} for the provided
 * `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean|string} args.shell The shell to test against.
 */
export const exec = test.macro({
  async exec(t, args) {
    const arg = args.arg;
    const shell = args.shell;

    await t.notThrowsAsync(tryRun(() => execTest.check({ arg, shell })));
    await t.notThrowsAsync(
      tryRun(() => execTest.checkUsingInterpolation({ arg, shell }))
    );
  },
  title(_, args) {
    const _options = { shell: args.shell };

    const arg = args.arg;
    const options = _options ? `, ${JSON.stringify(_options)}` : "";
    return `exec(command + "${arg}"${options}, callback)`;
  },
});

/**
 * The execSync macro tests Shescape usage with {@link cp.execSync} for the
 * provided `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean|string} args.shell The shell to test against.
 */
export const execSync = test.macro({
  exec(t, args) {
    const arg = args.arg;
    const shell = args.shell;

    t.notThrows(tryRun(() => execTest.checkSync({ arg, shell })));
    t.notThrows(
      tryRun(() => execTest.checkUsingInterpolationSync({ arg, shell }))
    );
  },
  title(_, args) {
    const _options = { shell: args.shell };

    const arg = args.arg;
    const options = _options ? `, ${JSON.stringify(_options)}` : "";
    return `execSync(command + "${arg}"${options})`;
  },
});

/**
 * The execFile macro tests Shescape usage with {@link cp.execFile} for the
 * provided `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean|string} args.shell The shell to test against.
 */
export const execFile = test.macro({
  async exec(t, args) {
    const arg = args.arg;
    const shell = args.shell;

    await t.notThrowsAsync(tryRun(() => execFileTest.check({ arg, shell })));
  },
  title(_, args) {
    const _options = { shell: args.shell };

    const arg = args.arg;
    const options = _options ? `, ${JSON.stringify(_options)}` : "";
    return `execFile(command, "${arg}"${options}, callback)`;
  },
});

/**
 * The execFileSync macro tests Shescape usage with {@link cp.execFileSync} for
 * the provided `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean|string} args.shell The shell to test against.
 */
export const execFileSync = test.macro({
  exec(t, args) {
    const arg = args.arg;
    const shell = args.shell;

    t.notThrows(tryRun(() => execFileTest.checkSync({ arg, shell })));
  },
  title(_, args) {
    const _options = { shell: args.shell };

    const arg = args.arg;
    const options = _options ? `, ${JSON.stringify(_options)}` : "";
    return `execFileSync(command, "${arg}"${options})`;
  },
});

/**
 * The fork macro tests Shescape usage with {@link cp.fork} for the provided
 * `arg` and `shell`.
 *
 * NOTE: `options.silent` is always set to `true`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 */
export const fork = test.macro({
  async exec(t, args) {
    const arg = args.arg;

    await t.notThrowsAsync(() => forkTest.check(arg));
  },
  title(_, args) {
    const _options = { shell: args.shell };

    const arg = args.arg;
    const options = _options ? `, ${JSON.stringify(_options)}` : "";
    return `fork(modulePath, "${arg}"${options})`;
  },
});

/**
 * The spawn macro tests Shescape usage with {@link cp.spawn} for the provided
 * `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean|string} args.shell The shell to test against.
 */
export const spawn = test.macro({
  async exec(t, args) {
    const arg = args.arg;
    const shell = args.shell;

    await t.notThrowsAsync(tryRun(() => spawnTest.check({ arg, shell })));
  },
  title(_, args) {
    const _options = { shell: args.shell };

    const arg = args.arg;
    const options = _options ? `, ${JSON.stringify(_options)}` : "";
    return `spawn(command, "${arg}"${options})`;
  },
});

/**
 * The spawn macro tests Shescape usage with {@link cp.spawnSync} for the
 * provided `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean|string} args.shell The shell to test against.
 */
export const spawnSync = test.macro({
  exec(t, args) {
    const arg = args.arg;
    const shell = args.shell;

    t.notThrows(tryRun(() => spawnTest.checkSync({ arg, shell })));
  },
  title(_, args) {
    const _options = { shell: args.shell };

    const arg = args.arg;
    const options = _options ? `, ${JSON.stringify(_options)}` : "";
    return `spawnSync(command, "${arg}"${options})`;
  },
});
