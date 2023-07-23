/**
 * @overview Provides functions for running a sample command with arguments
 * escaped by shescape against the `node:child_process` API.
 * @license MIT
 */

const assert = require("node:assert");
const cp = require("node:child_process");

const constants = require("./_constants.cjs");

const shescape = require("shescape");

/**
 * Checks if the fuzz shell is CMD.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if `shell` is CMD, `false` otherwise.
 */
function isShellCmd(shell) {
  return (
    (constants.isWindows && [undefined, true, false].includes(shell)) ||
    /cmd\.exe$/u.test(shell)
  );
}

/**
 * Checks if the fuzz shell is the C shell.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if `shell` is csh, `false` otherwise.
 */
function isShellCsh(shell) {
  return /csh$/u.test(shell);
}

/**
 * Checks if the fuzz shell is PowerShell.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if `shell` is PowerShell, `false` otherwise.
 */
function isShellPowerShell(shell) {
  return /powershell\.exe$/u.test(shell);
}

/**
 * Produces the expected echoed output.
 *
 * @param {object} args The function arguments.
 * @param {string} args.arg The input argument that was echoed.
 * @param {string} args.shell The shell used for echoing.
 * @param {boolean} normalizeWhitespace Whether whitespace should be normalized.
 * @returns {string} The expected echoed value.
 */
function getExpectedOutput({ arg, shell }, normalizeWhitespace) {
  // Remove control characters, like Shescape
  arg = arg.replace(/[\0\u0008\u001B\u009B]/gu, "");

  // Replace newline characters, like Shescape
  if (isShellCmd(shell) || isShellCsh(shell)) {
    arg = arg.replace(/\r?\n|\r/gu, " ");
  } else {
    arg = arg.replace(/\r(?!\n)/gu, "");
  }

  if (normalizeWhitespace) {
    // Replace newline characters, like Shescape
    if (!isShellCmd(shell)) {
      arg = arg.replace(/\r?\n/gu, " ");
    }

    // Convert whitespace between arguments, like the shell
    if (isShellCmd(shell)) {
      arg = arg.replace(/[\t ]+/gu, " ");
    }

    // Trim the string, like the shell
    if (isShellPowerShell(shell)) {
      arg = arg.replace(/^[\s\u0085]+/gu, "");
    } else if (isShellCmd(shell)) {
      arg = arg.replace(/^[\t\n\r ]+|(?<![\t\n\r ])[\t\n\r ]+$/gu, "");
    }
  }

  arg = `${arg}\n`; // Append a newline, like the echo script
  return arg;
}

module.exports.exec = function ({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };

  const quotedArg = shescape.quote(arg, {
    shell: execOptions.shell,
  });

  return new Promise((resolve, reject) => {
    cp.exec(
      `node ${constants.echoScript} ${quotedArg}`,
      execOptions,
      (error, stdout) => {
        if (error) {
          reject(`an unexpected error occurred: ${error}`);
        } else {
          const result = stdout;
          const expected = getExpectedOutput({ arg, shell });
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
};

module.exports.execSync = function ({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };

  const quotedArg = shescape.quote(arg, {
    shell: execOptions.shell,
  });

  let stdout;
  try {
    stdout = cp.execSync(
      `node ${constants.echoScript} ${quotedArg}`,
      execOptions,
    );
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = getExpectedOutput({ arg, shell });
  assert.strictEqual(result, expected);
};

module.exports.execUsingInterpolation = function ({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };

  const escapedArg = shescape.escape(arg, {
    shell: execOptions.shell,
    interpolation: true,
  });

  return new Promise((resolve, reject) => {
    cp.exec(
      `node ${constants.echoScript} ${escapedArg}`,
      execOptions,
      (error, stdout) => {
        if (error) {
          reject(`an unexpected error occurred: ${error}`);
        } else {
          const result = stdout;
          const expected = getExpectedOutput({ arg, shell }, true);
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
};

module.exports.execSyncUsingInterpolation = function ({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };

  const escapedArg = shescape.escape(arg, {
    shell: execOptions.shell,
    interpolation: true,
  });

  let stdout;
  try {
    stdout = cp.execSync(
      `node ${constants.echoScript} ${escapedArg}`,
      execOptions,
    );
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = getExpectedOutput({ arg, shell }, true);
  assert.strictEqual(result, expected);
};

module.exports.execFile = function ({ arg, shell }) {
  const execFileOptions = { encoding: "utf8", shell };

  const safeArg = execFileOptions.shell
    ? shescape.quote(arg, execFileOptions)
    : shescape.escape(arg, execFileOptions);

  return new Promise((resolve, reject) => {
    cp.execFile(
      "node",
      [constants.echoScript, safeArg],
      execFileOptions,
      (error, stdout) => {
        if (error) {
          reject(`an unexpected error occurred: ${error}`);
        } else {
          const result = stdout;
          const expected = getExpectedOutput({ arg, shell });
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
};

module.exports.execFileSync = function ({ arg, shell }) {
  const execFileOptions = { encoding: "utf8", shell };

  const safeArg = execFileOptions.shell
    ? shescape.quote(arg, execFileOptions)
    : shescape.escape(arg, execFileOptions);

  let stdout;
  try {
    stdout = cp.execFileSync(
      "node",
      [constants.echoScript, safeArg],
      execFileOptions,
    );
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = getExpectedOutput({ arg, shell });
  assert.strictEqual(result, expected);
};

module.exports.fork = function (arg) {
  const forkOptions = { silent: true };

  const safeArg = shescape.escape(arg);

  return new Promise((resolve, reject) => {
    const echo = cp.fork(constants.echoScript, [safeArg], forkOptions);

    echo.on("error", (error) => {
      reject(`an unexpected error occurred: ${error}`);
    });

    echo.stdout.on("data", (data) => {
      const result = data.toString();
      const expected = getExpectedOutput({ arg });
      try {
        assert.strictEqual(result, expected);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
};

module.exports.spawn = function ({ arg, shell }) {
  const spawnOptions = { encoding: "utf8", shell };

  const safeArg = spawnOptions.shell
    ? shescape.quote(arg, spawnOptions)
    : shescape.escape(arg, spawnOptions);

  return new Promise((resolve, reject) => {
    const child = cp.spawn(
      "node",
      [constants.echoScript, safeArg],
      spawnOptions,
    );

    child.on("error", (error) => {
      reject(`an unexpected error occurred: ${error}`);
    });

    child.stdout.on("data", (data) => {
      const result = data.toString();
      const expected = getExpectedOutput({ arg, shell });
      try {
        assert.strictEqual(result, expected);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
};

module.exports.spawnSync = function ({ arg, shell }) {
  const spawnOptions = { encoding: "utf8", shell };

  const safeArg = spawnOptions.shell
    ? shescape.quote(arg, spawnOptions)
    : shescape.escape(arg, spawnOptions);

  const child = cp.spawnSync(
    "node",
    [constants.echoScript, safeArg],
    spawnOptions,
  );

  if (child.error) {
    assert.fail(`an unexpected error occurred: ${child.error}`);
  } else {
    const result = child.stdout;
    const expected = getExpectedOutput({ arg, shell });
    assert.strictEqual(result, expected);
  }
};
