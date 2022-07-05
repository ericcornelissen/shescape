/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `fork`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { fork } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function check(arg) {
  const preparedArg = common.prepareArg({ arg, quoted: false }, true);

  return new Promise((resolve, reject) => {
    const echo = fork(common.ECHO_SCRIPT, shescape.escapeAll([preparedArg]), {
      silent: true,
    });

    echo.stdout.on("data", (data) => {
      const result = data.toString();
      const expected = common.getExpectedOutput({ arg });
      try {
        assert.strictEqual(result, expected);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
}

async function fuzz(buf) {
  const arg = buf.toString();

  try {
    await check(arg);
  } catch (e) {
    throw e;
  }
}

module.exports = {
  fuzz,
};
