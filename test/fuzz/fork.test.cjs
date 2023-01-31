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
  const argInfo = { arg, quoted: false };
  const forkOptions = { silent: true };

  const preparedArg = common.prepareArg(argInfo, true);
  const safeArg = shescape.escape(preparedArg);

  return new Promise((resolve, reject) => {
    const echo = fork(common.ECHO_SCRIPT, [safeArg], forkOptions);

    echo.on("error", (error) => {
      reject(`an unexpected error occurred: ${error}`);
    });

    echo.stdout.on("data", (data) => {
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

function checkMultipleArgs(args) {
  const argInfo = { quoted: false };
  const forkOptions = { silent: true };

  const preparedArgs = args.map((arg) =>
    common.prepareArg({ ...argInfo, arg }, true)
  );
  const safeArgs = shescape.escapeAll(preparedArgs);

  return new Promise((resolve, reject) => {
    const echo = fork(common.ECHO_SCRIPT, safeArgs, forkOptions);

    echo.on("error", (error) => {
      reject(`an unexpected error occurred: ${error}`);
    });

    echo.stdout.on("data", (data) => {
      const result = data.toString();
      const expected = common.getExpectedOutput({
        ...argInfo,
        arg: args.join(" "),
      });
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
  const args = arg.split(/[\n\r]+/u);

  try {
    await check(arg);
    await checkMultipleArgs(args);
  } catch (e) {
    throw e;
  }
}

module.exports = {
  fuzz,
};
