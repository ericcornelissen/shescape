/**
 * @overview Provides AVA test macros for end-to-end tests of using Shescape
 * with child_process.
 * @license Unlicense
 */

import * as cp from "node:child_process";

import test from "ava";
import isCI from "is-ci";

import * as constants from "../_constants.cjs";
import * as common from "../fuzz/_common.cjs";

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
        common.prepareArg({
          arg: maliciousInput,
          quoted: false,
          shell,
        }),
        execOptions
      );
    } else {
      safeArg = shescape.quote(
        common.prepareArg({
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
              `${benignInput} ${common.getExpectedOutput(
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
    const arg = args.arg;
    const shell = args.options?.shell;

    // The rest of the test is a copy of exec.test.cjs#L16-L31 except...
    const argInfo = { arg, shell, quoted: true };
    const execOptions = { ...args.options /*this*/, encoding: "utf8", shell };

    const preparedArg = common.prepareArg(argInfo);
    const quotedArg = shescape.quote(preparedArg, {
      ...execOptions,
    });

    // this error handler
    try {
      const stdout = cp.execSync(
        `node ${common.ECHO_SCRIPT} ${quotedArg}`,
        execOptions
      );

      const result = stdout;
      const expected = common.getExpectedOutput(argInfo);
      t.is(result, expected); // and the use of `t.is` here
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
      common.prepareArg(
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
            `${benignInput} ${common.getExpectedOutput({
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
    const arg = args.arg;
    const shell = args.options?.shell;

    // The rest of the test is a copy of exec-file.test.cjs#L16-L31 except...
    const argInfo = { arg, shell, quoted: Boolean(shell) };
    const execFileOptions = {
      ...args.options /*this*/,
      encoding: "utf8",
      shell,
    };

    const preparedArg = common.prepareArg(argInfo, !Boolean(shell));

    // this error handler
    try {
      const stdout = cp.execFileSync(
        "node",
        execFileOptions.shell
          ? shescape.quoteAll(
              [common.ECHO_SCRIPT, preparedArg],
              execFileOptions
            )
          : shescape.escapeAll(
              [common.ECHO_SCRIPT, preparedArg],
              execFileOptions
            ),
        execFileOptions
      );

      const result = stdout;
      const expected = common.getExpectedOutput(argInfo);
      t.is(result, expected); // and the use of `t.is` here
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
    const arg = args.arg;

    // The rest of the test is a copy of fork.test.cjs#L15-L37 except ...
    const argInfo = { arg, quoted: false };
    const forkOptions = { ...args.options /*this*/, silent: true };

    const preparedArg = common.prepareArg(argInfo, true);

    return new Promise((resolve, reject) => {
      const echo = cp.fork(
        common.ECHO_SCRIPT,
        shescape.escapeAll([preparedArg]),
        forkOptions
      );

      // this error handler
      echo.on("error", (error) => {
        if (isAllowedError(error)) {
          t.pass(`'${args.shell}' not tested, not available on the system`);
        } else {
          t.fail(`an unexpected error occurred: ${error}`);
        }
      });

      echo.stdout.on("data", (data) => {
        const result = data.toString();
        const expected = common.getExpectedOutput(argInfo);
        try {
          t.is(result, expected); // and the use of `t.is` here
          resolve();
        } catch (e) {
          reject(e);
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
      common.prepareArg(
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
          `${benignInput} ${common.getExpectedOutput({
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
    const arg = args.arg;
    const shell = args.options?.shell;

    // The rest of the test is a copy of spawn.test.cjs#L16-L31 except...
    const argInfo = { arg, shell, quoted: Boolean(shell) };
    const spawnOptions = { ...args.options /*this*/, encoding: "utf8", shell };

    const preparedArg = common.prepareArg(argInfo, !Boolean(shell));

    const child = cp.spawnSync(
      "node",
      spawnOptions.shell
        ? shescape.quoteAll([common.ECHO_SCRIPT, preparedArg], spawnOptions)
        : shescape.escapeAll([common.ECHO_SCRIPT, preparedArg], spawnOptions),
      spawnOptions
    );

    // ... this conditional
    if (child.error) {
      if (isAllowedError(child.error)) {
        t.pass(`'${args.shell}' not tested, not available on the system`);
      } else {
        t.fail(`an unexpected error occurred: ${child.error}`);
      }

      return;
    }

    const result = child.stdout;
    const expected = common.getExpectedOutput(argInfo);
    t.is(result, expected); // and the use of `t.is` here
  },
  title(_, args) {
    const arg = args.arg;
    const options = args.options ? `, ${JSON.stringify(args.options)}` : "";
    return `spawnSync(command, "${arg}"${options})`;
  },
});
