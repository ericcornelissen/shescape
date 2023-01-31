/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { spawnSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function check({ arg, shell }) {
  const argInfo = { arg, shell, quoted: Boolean(shell) };
  const spawnOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo, !Boolean(shell));
  const safeArg = spawnOptions.shell
    ? shescape.quote(preparedArg, spawnOptions)
    : shescape.escape(preparedArg, spawnOptions);

  const child = spawnSync("node", [common.ECHO_SCRIPT, safeArg], spawnOptions);

  if (child.error) {
    assert.fail(`an unexpected error occurred: ${child.error}`);
  } else {
    const result = child.stdout;
    const expected = common.getExpectedOutput(argInfo);
    assert.strictEqual(result, expected);
  }
}

function checkMultipleArgs({ args, shell }) {
  const argInfo = { shell, quoted: Boolean(shell) };
  const spawnOptions = { encoding: "utf8", shell };

  const preparedArgs = args.map((arg) =>
    common.prepareArg({ ...argInfo, arg }, !Boolean(shell))
  );
  const safeArgs = spawnOptions.shell
    ? shescape.quoteAll(preparedArgs, spawnOptions)
    : shescape.escapeAll(preparedArgs, spawnOptions);

  const child = spawnSync(
    "node",
    [common.ECHO_SCRIPT, ...safeArgs],
    spawnOptions
  );

  if (child.error) {
    assert.fail(`an unexpected error occurred: ${child.error}`);
  } else {
    const result = child.stdout;
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
