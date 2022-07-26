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

  const preparedArg = common.prepareArg(argInfo, true);

  const stdout = execFileSync(
    "node",
    shescape.escapeAll([common.ECHO_SCRIPT, preparedArg])
  );

  const result = stdout.toString();
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkWithShell(arg) {
  const shell = common.getFuzzShell() || true;
  const argInfo = { arg, shell, quoted: true };
  const spawnOptions = { shell };

  const preparedArg = common.prepareArg(argInfo, true);

  const stdout = execFileSync(
    "node",
    shescape.quoteAll([common.ECHO_SCRIPT, preparedArg], spawnOptions),
    spawnOptions
  );

  const result = stdout.toString();
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
    common.prepareArg({ ...argInfo, arg }, true)
  );

  const stdout = execFileSync(
    "node",
    shescape.quoteAll([common.ECHO_SCRIPT, ...preparedArgs], execFileOptions),
    execFileOptions
  );

  const result = stdout.toString();
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
  checkWithoutShellMultipleArgs(args);

  // Skipped because of a bug with `execFileSync` in child_process, see:
  // - https://github.com/nodejs/node/issues/29466#issuecomment-1146839772
  // - https://github.com/nodejs/node/issues/43333
  // - https://github.com/nodejs/node/pull/43345
  //checkWithShell(arg);
  //checkWithShellMultipleArgs(arg);
}

module.exports = {
  fuzz,
};
