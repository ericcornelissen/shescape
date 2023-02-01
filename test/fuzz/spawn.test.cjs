/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { spawn, spawnSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function check({ arg, shell }) {
  const argInfo = { arg, shell, quoted: Boolean(shell) };
  const spawnOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo, !Boolean(shell));
  const safeArg = spawnOptions.shell
    ? shescape.quote(preparedArg, spawnOptions)
    : shescape.escape(preparedArg, spawnOptions);

  return new Promise((resolve, reject) => {
    const child = spawn("node", [common.ECHO_SCRIPT, safeArg], spawnOptions);

    child.on("error", (error) => {
      reject(`an unexpected error occurred: ${error}`);
    });

    child.stdout.on("data", (data) => {
      const result = data.toString();
      const expected = common.getExpectedOutput(argInfo);
      try {
        assert.strictEqual(result, expected);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
}

function checkSync({ arg, shell }) {
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
  fuzz,
};
