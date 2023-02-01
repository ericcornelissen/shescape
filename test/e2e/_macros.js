/**
 * @overview Provides AVA test macros for end-to-end tests of using Shescape
 * with child_process.
 * @license Unlicense
 */

import * as cp from "node:child_process";

import test from "ava";

import * as execFileTest from "../fuzz/exec-file.test.cjs";
import * as execTest from "../fuzz/exec.test.cjs";
import * as forkTest from "../fuzz/fork.test.cjs";
import * as spawnTest from "../fuzz/spawn.test.cjs";

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

    await t.notThrowsAsync(() => execTest.check({ arg, shell }));
    await t.notThrowsAsync(() =>
      execTest.checkUsingInterpolation({ arg, shell })
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

    t.notThrows(() => execTest.checkSync({ arg, shell }));
    t.notThrows(() => execTest.checkUsingInterpolationSync({ arg, shell }));
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

    await t.notThrowsAsync(() => execFileTest.check({ arg, shell }));
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

    t.notThrows(() => execFileTest.checkSync({ arg, shell }));
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

    await t.notThrowsAsync(() => spawnTest.check({ arg, shell }));
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

    t.notThrows(() => spawnTest.checkSync({ arg, shell }));
  },
  title(_, args) {
    const _options = { shell: args.shell };

    const arg = args.arg;
    const options = _options ? `, ${JSON.stringify(_options)}` : "";
    return `spawnSync(command, "${arg}"${options})`;
  },
});
