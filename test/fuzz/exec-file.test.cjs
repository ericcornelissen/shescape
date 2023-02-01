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

async function fuzz(buf) {
  const arg = buf.toString();
  const shell = common.getFuzzShell();

  try {
    await check({ arg, shell });
    checkSync({ arg, shell });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  check,
  checkSync,
  fuzz,
};
