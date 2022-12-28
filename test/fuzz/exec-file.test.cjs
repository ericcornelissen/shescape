/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `execFile` / `execFileSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { execFileSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function check(arg) {
  const shell = common.getFuzzShell();
  const argInfo = { arg, shell, quoted: Boolean(shell) };
  const execFileOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo);

  const stdout = execFileSync(
    "node",
    execFileOptions.shell
      ? shescape.quoteAll([common.ECHO_SCRIPT, preparedArg], execFileOptions)
      : shescape.escapeAll([common.ECHO_SCRIPT, preparedArg], execFileOptions),
    execFileOptions
  );

  const result = stdout;
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkMultipleArgs(args) {
  const shell = common.getFuzzShell();
  const argInfo = { shell, quoted: Boolean(shell) };
  const execFileOptions = { shell };

  const preparedArgs = args.map((arg) =>
    common.prepareArg({ ...argInfo, arg }, !Boolean(shell))
  );

  const stdout = execFileSync(
    "node",
    execFileOptions.shell
      ? shescape.quoteAll(
          [common.ECHO_SCRIPT, ...preparedArgs],
          execFileOptions
        )
      : shescape.escapeAll(
          [common.ECHO_SCRIPT, ...preparedArgs],
          execFileOptions
        ),
    execFileOptions
  );

  const result = stdout.toString();
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

  check(arg);
  checkMultipleArgs(args);
}

module.exports = {
  fuzz,
};
