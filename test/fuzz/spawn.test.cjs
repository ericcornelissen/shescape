/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { spawnSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function checkWithoutShell(arg) {
  const argInfo = { arg, shell: undefined, quoted: false };

  const preparedArg = common.prepareArg(argInfo, true);

  const child = spawnSync(
    "node",
    shescape.escapeAll([common.ECHO_SCRIPT, preparedArg])
  );

  const result = child.stdout.toString();
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkWithShell(arg) {
  const shell = common.getFuzzShell() || true;
  const argInfo = { arg, shell, quoted: true };
  const spawnOptions = { shell };

  const preparedArg = common.prepareArg(argInfo);

  const child = spawnSync(
    "node",
    shescape.quoteAll([common.ECHO_SCRIPT, preparedArg], spawnOptions),
    spawnOptions
  );

  const result = child.stdout.toString();
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkWithoutShellMultipleArgs(args) {
  const argInfo = { shell: undefined, quoted: false };

  const preparedArgs = args.map((arg) =>
    common.prepareArg({ ...argInfo, arg }, true)
  );

  const child = spawnSync(
    "node",
    shescape.escapeAll([common.ECHO_SCRIPT, ...preparedArgs])
  );

  const result = child.stdout.toString();
  const expected = common.getExpectedOutput({
    ...argInfo,
    arg: args.join(" "),
  });
  assert.strictEqual(result, expected);
}

function checkWithShellMultipleArgs(args) {
  const shell = common.getFuzzShell() || true;
  const argInfo = { shell, quoted: true };
  const spawnOptions = { shell };

  const preparedArgs = args.map((arg) =>
    common.prepareArg({ ...argInfo, arg }, true)
  );

  const child = spawnSync(
    "node",
    shescape.escapeAll([common.ECHO_SCRIPT, ...preparedArgs], spawnOptions),
    spawnOptions
  );

  const result = child.stdout.toString();
  const expected = common.getExpectedOutput({
    ...argInfo,
    arg: args.join(" "),
  });
  assert.strictEqual(result, expected);
}

function fuzz(buf) {
  const arg = buf.toString();
  const args = arg.split(/[\n\r]+/g, "");

  checkWithoutShell(arg);
  checkWithShell(arg);
  checkWithoutShellMultipleArgs(args);
  checkWithShellMultipleArgs(args);
}

module.exports = {
  fuzz,
};
