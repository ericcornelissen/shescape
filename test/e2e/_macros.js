/**
 * @overview Provides AVA test macros for end-to-end tests of using Shescape
 * with child_process.
 * @license Unlicense
 */

import * as cp from "node:child_process";

import test from "ava";
import isCI from "is-ci";

import * as constants from "../_constants.cjs";
import { getExpectedOutput, prepareArg } from "../fuzz/_common.cjs";

import * as shescape from "../../index.js";

const isAllowedError = (error) => !isCI && error.code === "ENOENT";

/**
 * The exec macro tests Shescape usage with {@link cp.exec} for the provided
 * `arg` and `options`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {object} args.options The `options` for {@link cp.exec}.
 */
export const exec = test.macro({
  exec(t, args) {
    const shell = args.options?.shell;
    const execOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;

    let safeArg;
    if (execOptions?.interpolation) {
      safeArg = shescape.escape(
        prepareArg({
          arg: maliciousInput,
          quoted: false,
          shell,
        }),
        execOptions
      );
    } else {
      safeArg = shescape.quote(
        prepareArg({
          arg: maliciousInput,
          quoted: true,
          shell,
        }),
        execOptions
      );
    }

    return new Promise((resolve) => {
      cp.exec(
        `node ${constants.echoScript} ${benignInput} ${safeArg}`,
        execOptions,
        (error, stdout) => {
          if (error) {
            if (isAllowedError(error)) {
              t.pass(`'${args.shell}' not tested, not available on the system`);
            } else {
              t.fail(`an unexpected error occurred: ${error}`);
            }
          } else {
            t.is(
              `${stdout}`,
              `${benignInput} ${getExpectedOutput(
                { arg: maliciousInput, shell },
                execOptions?.interpolation
              )}`
            );
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
 * provided `arg` and `options`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {object} args.options The `options` for {@link cp.execSync}.
 */
export const execSync = test.macro({
  exec(t, args) {
    const shell = args.options?.shell;
    const execOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;

    const safeArg = shescape.quote(
      prepareArg({
        arg: maliciousInput,
        quoted: true,
        shell,
      }),
      execOptions
    );

    try {
      const stdout = cp.execSync(
        `node ${constants.echoScript} ${benignInput} ${safeArg}`,
        execOptions
      );
      t.is(
        `${stdout}`,
        `${benignInput} ${getExpectedOutput({
          arg: maliciousInput,
          shell,
        })}`
      );
    } catch (error) {
      if (isAllowedError(error)) {
        t.pass(`'${args.shell}' not tested, not available on the system`);
      } else {
        t.fail(`an unexpected error occurred: ${error}`);
      }
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
 * provided `arg` and `options`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {object} args.options The `options` for {@link cp.execFile}.
 */
export const execFile = test.macro({
  exec(t, args) {
    const shell = args.options?.shell;
    const execFileOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;
    const unsafeArgs = [
      constants.echoScript,
      benignInput,
      prepareArg(
        {
          arg: maliciousInput,
          quoted: Boolean(shell),
          shell,
        },
        !Boolean(shell)
      ),
    ];

    const safeArgs = Boolean(shell)
      ? shescape.quoteAll(unsafeArgs, execFileOptions)
      : shescape.escapeAll(unsafeArgs, execFileOptions);

    return new Promise((resolve) => {
      cp.execFile("node", safeArgs, execFileOptions, (error, stdout) => {
        if (error) {
          if (isAllowedError(error)) {
            t.pass(`'${args.shell}' not tested, not available on the system`);
          } else {
            t.fail(`an unexpected error occurred: ${error}`);
          }
        } else {
          t.is(
            `${stdout}`,
            `${benignInput} ${getExpectedOutput({
              arg: maliciousInput,
              shell,
            })}`
          );
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
 * the provided `arg` and `options`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {object} args.options The `options` for {@link cp.execFileSync}.
 */
export const execFileSync = test.macro({
  exec(t, args) {
    const shell = args.options?.shell;
    const execFileOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;
    const unsafeArgs = [
      constants.echoScript,
      benignInput,
      prepareArg(
        {
          arg: maliciousInput,
          quoted: Boolean(shell),
          shell,
        },
        !Boolean(shell)
      ),
    ];

    const safeArgs = Boolean(shell)
      ? shescape.quoteAll(unsafeArgs, execFileOptions)
      : shescape.escapeAll(unsafeArgs, execFileOptions);

    try {
      const stdout = cp.execFileSync("node", safeArgs, execFileOptions);
      t.is(
        `${stdout}`,
        `${benignInput} ${getExpectedOutput({
          arg: maliciousInput,
          shell,
        })}`
      );
    } catch (error) {
      if (isAllowedError(error)) {
        t.pass(`'${args.shell}' not tested, not available on the system`);
      } else {
        t.fail(`an unexpected error occurred: ${error}`);
      }
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
 * `arg` and `options`.
 *
 * NOTE: `options.silent` is always set to `true`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {object} args.options The `options` for {@link cp.fork}.
 */
export const fork = test.macro({
  exec(t, args) {
    t.plan(1);

    const shell = args.options?.shell;
    const forkOptions = {
      ...args.options,
      silent: true, // Must be set to ensure stdout is available in the test
    };

    const benignInput = "foobar";
    const maliciousInput = args.arg;
    const unsafeArgs = [
      benignInput,
      prepareArg(
        {
          arg: maliciousInput,
          quoted: false,
          shell,
        },
        true
      ),
    ];

    const safeArgs = shescape.escapeAll(unsafeArgs, forkOptions);

    return new Promise((resolve) => {
      const echo = cp.fork(constants.echoScript, safeArgs, forkOptions);

      echo.on("close", resolve);

      echo.stdout.on("data", (data) => {
        t.is(
          `${data}`,
          `${benignInput} ${getExpectedOutput({
            arg: maliciousInput,
            shell,
          })}`
        );
      });

      echo.on("error", (error) => {
        if (isAllowedError(error)) {
          t.pass(`'${args.shell}' not tested, not available on the system`);
        } else {
          t.fail(`an unexpected error occurred: ${error}`);
        }
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
 * `arg` and `options`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {object} args.options The `options` for {@link cp.spawn}.
 */
export const spawn = test.macro({
  exec(t, args) {
    t.plan(1);

    const shell = args.options?.shell;
    const spawnOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;
    const unsafeArgs = [
      constants.echoScript,
      benignInput,
      prepareArg(
        {
          arg: maliciousInput,
          quoted: Boolean(shell),
          shell,
        },
        !Boolean(shell)
      ),
    ];

    const safeArgs = Boolean(shell)
      ? shescape.quoteAll(unsafeArgs, spawnOptions)
      : shescape.escapeAll(unsafeArgs, spawnOptions);

    return new Promise((resolve) => {
      const echo = cp.spawn("node", safeArgs, spawnOptions);

      echo.on("close", resolve);

      echo.stdout.on("data", (data) => {
        t.is(
          `${data}`,
          `${benignInput} ${getExpectedOutput({
            arg: maliciousInput,
            shell,
          })}`
        );
      });

      echo.on("error", (error) => {
        if (isAllowedError(error)) {
          t.pass(`'${args.shell}' not tested, not available on the system`);
        } else {
          t.fail(`an unexpected error occurred: ${error}`);
        }
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
 * provided `arg` and `options`.
 *
 * @param {object} args The arguments for this macro.
 * @param {string} args.arg The command argument to test with.
 * @param {object} args.options The `options` for {@link cp.spawnSync}.
 */
export const spawnSync = test.macro({
  exec(t, args) {
    const shell = args.options?.shell;
    const spawnOptions = args.options;

    const benignInput = "foobar";
    const maliciousInput = args.arg;
    const unsafeArgs = [
      constants.echoScript,
      benignInput,
      prepareArg(
        {
          arg: maliciousInput,
          quoted: Boolean(shell),
          shell,
        },
        !Boolean(shell)
      ),
    ];

    const safeArgs = Boolean(shell)
      ? shescape.quoteAll(unsafeArgs, spawnOptions)
      : shescape.escapeAll(unsafeArgs, spawnOptions);

    const echo = cp.spawnSync("node", safeArgs, spawnOptions);
    if (echo.error) {
      if (isAllowedError(echo.error)) {
        t.pass(`'${args.shell}' not tested, not available on the system`);
      } else {
        t.fail(`an unexpected error occurred: ${echo.error}`);
      }
    } else {
      t.is(
        `${echo.stdout}`,
        `${benignInput} ${getExpectedOutput({
          arg: maliciousInput,
          shell,
        })}`
      );
    }
  },
  title(_, args) {
    const arg = args.arg;
    const options = args.options ? `, ${JSON.stringify(args.options)}` : "";
    return `spawnSync(command, "${arg}"${options})`;
  },
});
