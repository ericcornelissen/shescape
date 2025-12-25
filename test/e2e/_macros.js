/**
 * @overview Provides AVA test macros for end-to-end tests of using Shescape
 * with child_process.
 * @license MIT
 */

import test from "ava";

import * as runners from "../_runners.js";

/**
 * The exec macro tests Shescape usage with {@link exec} for the provided `arg`
 * and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean | string} args.shell The shell to test against.
 */
export const exec = test.macro({
  async exec(t, args) {
    const scenario = {
      arg: args.arg,
      shell: args.shell,
    };

    await t.notThrowsAsync(() => runners.execQuote(scenario));
    await t.notThrowsAsync(() => runners.execEscape(scenario));
  },
  title(_, args) {
    const arg = args.arg.replace(/"/gu, '\\"');
    const options = JSON.stringify({ shell: args.shell });
    return `exec(command + "${arg}", ${options}, callback)`;
  },
});

/**
 * The execSync macro tests Shescape usage with {@link execSync} for the
 * provided `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean | string} args.shell The shell to test against.
 */
export const execSync = test.macro({
  exec(t, args) {
    const scenario = {
      arg: args.arg,
      shell: args.shell,
    };

    t.notThrows(() => runners.execSyncQuote(scenario));
    t.notThrows(() => runners.execSyncEscape(scenario));
  },
  title(_, args) {
    const arg = args.arg.replace(/"/gu, '\\"');
    const options = JSON.stringify({ shell: args.shell });
    return `execSync(command + "${arg}", ${options})`;
  },
});

/**
 * The execFile macro tests Shescape usage with {@link execFile} for the
 * provided `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean | string} args.shell The shell to test against.
 */
export const execFile = test.macro({
  async exec(t, args) {
    const scenario = {
      arg: args.arg,
      shell: args.shell,
    };

    await t.notThrowsAsync(() => runners.execFile(scenario));
  },
  title(_, args) {
    const arg = args.arg.replace(/"/gu, '\\"');
    const options = JSON.stringify({ shell: args.shell });
    return `execFile(file, ["${arg}"], ${options}, callback)`;
  },
});

/**
 * The execFileSync macro tests Shescape usage with {@link execFileSync} for the
 * provided `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean | string} args.shell The shell to test against.
 */
export const execFileSync = test.macro({
  exec(t, args) {
    const scenario = {
      arg: args.arg,
      shell: args.shell,
    };

    t.notThrows(() => runners.execFileSync(scenario));
  },
  title(_, args) {
    const arg = args.arg.replace(/"/gu, '\\"');
    const options = JSON.stringify({ shell: args.shell });
    return `execFileSync(file, ["${arg}"], ${options})`;
  },
});

/**
 * The fork macro tests Shescape usage with {@link fork} for the provided `arg`
 * and `shell`.
 *
 * NOTE: `options.silent` is always set to `true`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 */
export const fork = test.macro({
  async exec(t, args) {
    const arg = args.arg;

    await t.notThrowsAsync(() => runners.fork(arg));
  },
  title(_, args) {
    const arg = args.arg;
    return `fork(modulePath, ["${arg}"])`;
  },
});

/**
 * The spawn macro tests Shescape usage with {@link spawn} for the provided
 * `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean | string} args.shell The shell to test against.
 */
export const spawn = test.macro({
  async exec(t, args) {
    const scenario = {
      arg: args.arg,
      shell: args.shell,
    };

    await t.notThrowsAsync(() => runners.spawn(scenario));
  },
  title(_, args) {
    const arg = args.arg.replace(/"/gu, '\\"');
    const options = JSON.stringify({ shell: args.shell });
    return `spawn(command, ["${arg}"], ${options})`;
  },
});

/**
 * The spawn macro tests Shescape usage with {@link spawnSync} for the provided
 * `arg` and `shell`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {boolean | string} args.shell The shell to test against.
 */
export const spawnSync = test.macro({
  exec(t, args) {
    const scenario = {
      arg: args.arg,
      shell: args.shell,
    };

    t.notThrows(() => runners.spawnSync(scenario));
  },
  title(_, args) {
    const arg = args.arg.replace(/"/gu, '\\"');
    const options = JSON.stringify({ shell: args.shell });
    return `spawnSync(command, ["${arg}"], ${options})`;
  },
});

/**
 * @import { exec, execSync, execFile, execFileSync, fork, spawn, spawnSync } from "node:cp"
 */
