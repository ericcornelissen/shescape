/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `execFile` / `execFileSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { execFile, execFileSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function check({ arg, shell }) {
  const argInfo = { arg, shell, quoted: Boolean(shell) };
  const execFileOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo, !Boolean(shell));
  const safeArg = execFileOptions.shell
    ? shescape.quote(preparedArg, execFileOptions)
    : shescape.escape(preparedArg, execFileOptions);

  return new Promise((resolve, reject) => {
    execFile(
      "node",
      [common.ECHO_SCRIPT, safeArg],
      execFileOptions,
      (error, stdout) => {
        if (error) {
          reject(`an unexpected error occurred: ${error}`);
        } else {
          const result = stdout;
          const expected = common.getExpectedOutput(argInfo);
          try {
            assert.strictEqual(result, expected);
            resolve();
          } catch (e) {
            reject(e);
          }
        }
      }
    );
  });
}

function checkSync({ arg, shell }) {
  const argInfo = { arg, shell, quoted: Boolean(shell) };
  const execFileOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo, !Boolean(shell));
  const safeArg = execFileOptions.shell
    ? shescape.quote(preparedArg, execFileOptions)
    : shescape.escape(preparedArg, execFileOptions);

  let stdout;
  try {
    stdout = execFileSync(
      "node",
      [common.ECHO_SCRIPT, safeArg],
      execFileOptions
    );
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkMultipleArgs({ args, shell }) {
  const argInfo = { shell, quoted: Boolean(shell) };
  const execFileOptions = { encoding: "utf8", shell };

  const preparedArgs = args.map((arg) =>
    common.prepareArg({ ...argInfo, arg }, !Boolean(shell))
  );
  const safeArgs = execFileOptions.shell
    ? shescape.quoteAll(preparedArgs, execFileOptions)
    : shescape.escapeAll(preparedArgs, execFileOptions);

  return new Promise((resolve, reject) => {
    execFile(
      "node",
      [common.ECHO_SCRIPT, ...safeArgs],
      execFileOptions,
      (error, stdout) => {
        if (error) {
          reject(`an unexpected error occurred: ${error}`);
        } else {
          const result = stdout;
          const expected = common.getExpectedOutput({
            ...argInfo,
            arg: (common.isShellPowerShell(shell)
              ? args.filter(
                  (arg) =>
                    arg.replace(/[\0\u0008\u001B\u009B]/gu, "").length !== 0
                )
              : args
            ).join(" "),
          });
          try {
            assert.strictEqual(result, expected);
            resolve();
          } catch (e) {
            reject(e);
          }
        }
      }
    );
  });
}

function checkMultipleArgsSync({ args, shell }) {
  const argInfo = { shell, quoted: Boolean(shell) };
  const execFileOptions = { encoding: "utf8", shell };

  const preparedArgs = args.map((arg) =>
    common.prepareArg({ ...argInfo, arg }, !Boolean(shell))
  );
  const safeArgs = execFileOptions.shell
    ? shescape.quoteAll(preparedArgs, execFileOptions)
    : shescape.escapeAll(preparedArgs, execFileOptions);

  let stdout;
  try {
    stdout = execFileSync(
      "node",
      [common.ECHO_SCRIPT, ...safeArgs],
      execFileOptions
    );
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = common.getExpectedOutput({
    ...argInfo,
    arg: (common.isShellPowerShell(shell)
      ? args.filter(
          (arg) => arg.replace(/[\0\u0008\u001B\u009B]/gu, "").length !== 0
        )
      : args
    ).join(" "),
  });
  assert.strictEqual(result, expected);
}

async function fuzz(buf) {
  const arg = buf.toString();
  const args = arg.split(/[\n\r]+/u);

  const shell = common.getFuzzShell();

  try {
    await check({ arg, shell });
    await checkMultipleArgs({ args, shell });
    checkSync({ arg, shell });
    checkMultipleArgsSync({ args, shell });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  fuzz,
};
