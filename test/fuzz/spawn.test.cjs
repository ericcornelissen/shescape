/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license MIT
 */

const assert = require("node:assert");
const { spawn, spawnSync } = require("node:child_process");

const common = require("./_common.cjs");

const { Shescape } = require("../../index.cjs");

function check({ arg, shell }) {
  const spawnOptions = { encoding: "utf8", shell };

  const shescape = new Shescape({
    ...spawnOptions,
    flagProtection: false,
    interpolation: false,
  });

  const safeArg = spawnOptions.shell
    ? shescape.quote(arg)
    : shescape.escape(arg);

  return new Promise((resolve, reject) => {
    const child = spawn("node", [common.ECHO_SCRIPT, safeArg], spawnOptions);

    child.on("error", (error) => {
      reject(`an unexpected error occurred: ${error}`);
    });

    child.stdout.on("data", (data) => {
      const result = data.toString();
      const expected = common.getExpectedOutput({ arg, shell });
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
  const spawnOptions = { encoding: "utf8", shell };

  const shescape = new Shescape({
    ...spawnOptions,
    flagProtection: false,
    interpolation: false,
  });

  const safeArg = spawnOptions.shell
    ? shescape.quote(arg)
    : shescape.escape(arg);

  const child = spawnSync("node", [common.ECHO_SCRIPT, safeArg], spawnOptions);

  if (child.error) {
    assert.fail(`an unexpected error occurred: ${child.error}`);
  } else {
    const result = child.stdout;
    const expected = common.getExpectedOutput({ arg, shell });
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
  check,
  checkSync,
  fuzz,
};
