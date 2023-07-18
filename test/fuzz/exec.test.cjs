/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license MIT
 */

const assert = require("node:assert");
const { exec, execSync } = require("node:child_process");

const common = require("./_common.cjs");

const { Shescape } = require("../../index.cjs");

function check({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };

  const shescape = new Shescape({
    flagProtection: false,
    interpolation: false,
    shell: execOptions.shell,
  });

  const quotedArg = shescape.quote(arg);

  return new Promise((resolve, reject) => {
    exec(
      `node ${common.ECHO_SCRIPT} ${quotedArg}`,
      execOptions,
      (error, stdout) => {
        if (error) {
          reject(`an unexpected error occurred: ${error}`);
        } else {
          const result = stdout;
          const expected = common.getExpectedOutput({ arg, shell });
          try {
            assert.strictEqual(result, expected);
            resolve();
          } catch (e) {
            reject(e);
          }
        }
      },
    );
  });
}

function checkSync({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };

  const shescape = new Shescape({
    flagProtection: false,
    interpolation: false,
    shell: execOptions.shell,
  });

  const quotedArg = shescape.quote(arg);

  let stdout;
  try {
    stdout = execSync(`node ${common.ECHO_SCRIPT} ${quotedArg}`, execOptions);
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = common.getExpectedOutput({ arg, shell });
  assert.strictEqual(result, expected);
}

function checkUsingInterpolation({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };

  const shescape = new Shescape({
    flagProtection: false,
    interpolation: true,
    shell: execOptions.shell,
  });

  const escapedArg = shescape.escape(arg);

  return new Promise((resolve, reject) => {
    exec(
      `node ${common.ECHO_SCRIPT} ${escapedArg}`,
      execOptions,
      (error, stdout) => {
        if (error) {
          reject(`an unexpected error occurred: ${error}`);
        } else {
          const result = stdout;
          const expected = common.getExpectedOutput({ arg, shell }, true);
          try {
            assert.strictEqual(result, expected);
            resolve();
          } catch (e) {
            reject(e);
          }
        }
      },
    );
  });
}

function checkUsingInterpolationSync({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };

  const shescape = new Shescape({
    flagProtection: false,
    interpolation: true,
    shell: execOptions.shell,
  });

  const escapedArg = shescape.escape(arg);

  let stdout;
  try {
    stdout = execSync(`node ${common.ECHO_SCRIPT} ${escapedArg}`, execOptions);
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = common.getExpectedOutput({ arg, shell }, true);
  assert.strictEqual(result, expected);
}

async function fuzz(buf) {
  const arg = buf.toString();
  const shell = common.getFuzzShell();

  try {
    await check({ arg, shell });
    await checkUsingInterpolation({ arg, shell });
    checkSync({ arg, shell });
    checkUsingInterpolationSync({ arg, shell });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  check,
  checkSync,
  checkUsingInterpolation,
  checkUsingInterpolationSync,
  fuzz,
};
