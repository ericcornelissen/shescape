/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `execFile` / `execFileSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { execFileSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function checkWithoutShell(arg) {
  const argInfo = { arg, shell: undefined, quoted: false };
  const execFileOptions = { encoding: "utf8" };

  const preparedArg = common.prepareArg(argInfo, true);

  const stdout = execFileSync(
    "node",
    shescape.escapeAll([common.ECHO_SCRIPT, preparedArg]),
    execFileOptions
  );

  const result = stdout;
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkWithShell(arg) {
  const shell = common.getFuzzShell() || true;
  const argInfo = { arg, shell, quoted: true };
  const execFileOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo);

  const stdout = execFileSync(
    "node",
    shescape.quoteAll([common.ECHO_SCRIPT, preparedArg], execFileOptions),
    execFileOptions
  );

  const result = stdout;
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkWithoutShellMultipleArgs(args) {
  const argInfo = { shell: undefined, quoted: false };

  const preparedArgs = args.map((arg) =>
    common.prepareArg({ ...argInfo, arg }, true)
  );

  const stdout = execFileSync(
    "node",
    shescape.escapeAll([common.ECHO_SCRIPT, ...preparedArgs])
  );

  const result = stdout.toString();
  const expected = common.getExpectedOutput({
    ...argInfo,
    arg: args.join(" "),
  });
  assert.strictEqual(result, expected);
}

function checkWithShellMultipleArgs(args) {
  const shell = common.getFuzzShell() || true;
  const argInfo = { shell, quoted: true };
  const execFileOptions = { shell };

  const preparedArgs = args.map((arg) =>
    common.prepareArg({ ...argInfo, arg }, false)
  );

  const stdout = execFileSync(
    "node",
    shescape.quoteAll([common.ECHO_SCRIPT, ...preparedArgs], execFileOptions),
    execFileOptions
  );

  const result = stdout.toString();
  const expected = common.getExpectedOutput({
    ...argInfo,
    arg: (common.isShellPowerShell(shell)
      ? args.filter((arg) => arg.replace(/\0/g, "").length !== 0)
      : args
    ).join(" "),
  });
  assert.strictEqual(result, expected);
}

function fuzz(buf) {
  const arg = buf.toString();
  const args = arg.split(/[\n\r]+/);

  checkWithoutShell(arg);
  checkWithoutShellMultipleArgs(args);
  checkWithShell(arg);
  checkWithShellMultipleArgs(args);
}

module.exports = {
  fuzz,
};
