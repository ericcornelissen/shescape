/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `execFile` / `execFileSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { execFileSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function check({ arg, shell }) {
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

function fuzz(buf) {
  const arg = buf.toString();
  const args = arg.split(/[\n\r]+/u);

  const shell = common.getFuzzShell();

  check({ arg, shell });
  checkMultipleArgs({ args, shell });
}

module.exports = {
  fuzz,
};
