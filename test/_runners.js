/**
 * @overview Provides functions for running a sample command with arguments
 * escaped by shescape against the `node:child_process` API.
 * @license MIT
 */

import assert from "node:assert";
import cp from "node:child_process";

import { Shescape } from "shescape";

import * as constants from "./_constants.js";

/**
 * Checks if the fuzz shell is CMD.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if `shell` is CMD, `false` otherwise.
 */
function isShellCmd(shell) {
  return (
    (constants.isWindows && [undefined, true].includes(shell)) ||
    /cmd(?:\.(?:EXE|exe))?$/u.test(shell)
  );
}

/**
 * Checks if the fuzz shell is the C shell.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if `shell` is csh, `false` otherwise.
 */
function isShellCsh(shell) {
  return typeof shell === "string" && shell.endsWith("csh");
}

/**
 * Checks if the fuzz shell is PowerShell.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if `shell` is PowerShell, `false` otherwise.
 */
function isShellPowerShell(shell) {
  return /powershell(?:\.(?:EXE|exe))?$/u.test(shell);
}

/**
 * Produces the expected echoed output.
 *
 * @param {string} arg The input argument that was echoed.
 * @param {object} options The options provided to Shescape.
 * @param {boolean} normalizeWhitespace Whether whitespace should be normalized.
 * @returns {string} The expected echoed value.
 */
function getExpectedOutput(arg, options, normalizeWhitespace) {
  // Remove control characters, like Shescape
  arg = arg.replace(/[\0\u0008\u001B\u009B]/gu, "");

  // Replace newline characters, like Shescape
  if (isShellCmd(options.shell) || isShellCsh(options.shell)) {
    arg = arg.replace(/\r/gu, "").replace(/\n/gu, " ");
  } else {
    arg = arg.replace(/\r(?!\n)/gu, "");
  }

  if (normalizeWhitespace) {
    // Replace newline characters, like Shescape
    if (!isShellCmd(options.shell)) {
      arg = arg.replace(/\r?\n/gu, " ");
    }

    // Trim the string, like the shell
    if (isShellPowerShell(options.shell)) {
      arg = arg.replace(/^[\s\u0085]+/gu, "");
    }
  }

  arg = `${arg}\n`; // Append a newline, like the echo script
  return arg;
}

/**
 * Test whether the `quote` function escapes & quotes the provided argument
 * correctly for the given shell for the `child_process.exec` function.
 *
 * @param {object} args The arguments.
 * @param {string} args.arg The CLI argument to test.
 * @param {string} args.shell The shell to test for.
 * @returns {Promise} Resolving if quoting was successful, rejecting otherwise.
 */
export function execQuote({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };
  const shescapeOptions = {
    flagProtection: false,
    shell: execOptions.shell,
  };

  const shescape = new Shescape(shescapeOptions);
  const safeArg = shescape.quote(arg);

  return new Promise((resolve, reject) => {
    cp.exec(
      `node ${constants.echoScript} ${safeArg}`,
      execOptions,
      (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          const result = stdout;
          const expected = getExpectedOutput(arg, shescapeOptions);
          try {
            assert.strictEqual(result, expected);
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      },
    );
  });
}

/**
 * Test whether the `quote` function escapes & quotes the provided argument
 * correctly for the given shell for the `child_process.execSync` function.
 *
 * @param {object} args The arguments.
 * @param {string} args.arg The CLI argument to test.
 * @param {string} args.shell The shell to test for.
 * @returns {void} If quoting was successful.
 * @throws {Error} If quoting was not successful.
 */
export function execSyncQuote({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };
  const shescapeOptions = {
    flagProtection: false,
    shell: execOptions.shell,
  };

  const shescape = new Shescape(shescapeOptions);
  const safeArg = shescape.quote(arg);

  let stdout;
  try {
    stdout = cp.execSync(
      `node ${constants.echoScript} ${safeArg}`,
      execOptions,
    );
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = getExpectedOutput(arg, shescapeOptions);
  assert.strictEqual(result, expected);
}

/**
 * Test whether the `escape` function escapes the provided argument correctly
 * for the given shell for the `child_process.exec` function.
 *
 * @param {object} args The arguments.
 * @param {string} args.arg The CLI argument to test.
 * @param {string} args.shell The shell to test for.
 * @returns {Promise} Resolving if escaping was successful, rejecting otherwise.
 */
export function execEscape({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };
  const shescapeOptions = {
    flagProtection: false,
    shell: execOptions.shell,
  };

  const shescape = new Shescape(shescapeOptions);
  const safeArg = shescape.escape(arg);

  return new Promise((resolve, reject) => {
    cp.exec(
      `node ${constants.echoScript} ${safeArg}`,
      execOptions,
      (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          const result = stdout;
          const expected = getExpectedOutput(arg, shescapeOptions, true);
          try {
            assert.strictEqual(result, expected);
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      },
    );
  });
}

/**
 * Test whether the `escape` function escapes the provided argument correctly
 * for the given shell for the `child_process.execSync` function.
 *
 * @param {object} args The arguments.
 * @param {string} args.arg The CLI argument to test.
 * @param {string} args.shell The shell to test for.
 * @returns {void} If escaping was successful.
 * @throws {Error} If escaping was not successful.
 */
export function execSyncEscape({ arg, shell }) {
  const execOptions = { encoding: "utf8", shell };
  const shescapeOptions = {
    flagProtection: false,
    shell: execOptions.shell,
  };

  const shescape = new Shescape(shescapeOptions);
  const safeArg = shescape.escape(arg);

  let stdout;
  try {
    stdout = cp.execSync(
      `node ${constants.echoScript} ${safeArg}`,
      execOptions,
    );
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = getExpectedOutput(arg, shescapeOptions, true);
  assert.strictEqual(result, expected);
}

/**
 * Test whether shescape escapes (and quotes, if necessary) the provided
 * argument correctly for the given shell for the `child_process.execFile`
 * function.
 *
 * @param {object} args The arguments.
 * @param {string} args.arg The CLI argument to test.
 * @param {string} args.shell The shell to test for.
 * @returns {Promise} Resolving if escaping was successful, rejecting otherwise.
 */
export function execFile({ arg, shell }) {
  const execFileOptions = { encoding: "utf8", shell };
  const shescapeOptions = {
    flagProtection: false,
    shell: execFileOptions.shell || false,
  };

  const shescape = new Shescape(shescapeOptions);
  const safeArg = execFileOptions.shell
    ? shescape.quote(arg)
    : shescape.escape(arg);

  return new Promise((resolve, reject) => {
    cp.execFile(
      "node",
      [constants.echoScript, safeArg],
      execFileOptions,
      (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          const result = stdout;
          const expected = getExpectedOutput(arg, shescapeOptions);
          try {
            assert.strictEqual(result, expected);
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      },
    );
  });
}

/**
 * Test whether shescape escapes (and quotes, if necessary) the provided
 * argument correctly for the given shell for the `child_process.execFileSync`
 * function.
 *
 * @param {object} args The arguments.
 * @param {string} args.arg The CLI argument to test.
 * @param {string} args.shell The shell to test for.
 * @returns {void} If escaping was successful.
 * @throws {Error} If escaping was not successful.
 */
export function execFileSync({ arg, shell }) {
  const execFileOptions = { encoding: "utf8", shell };
  const shescapeOptions = {
    flagProtection: false,
    shell: execFileOptions.shell || false,
  };

  const shescape = new Shescape(shescapeOptions);
  const safeArg = execFileOptions.shell
    ? shescape.quote(arg)
    : shescape.escape(arg);

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
  const expected = getExpectedOutput(arg, shescapeOptions);
  assert.strictEqual(result, expected);
}

/**
 * Test whether shescape escapes the provided argument correctly for the
 * `child_process.fork` function.
 *
 * @param {string} arg The CLI argument to test.
 * @returns {Promise} Resolving if escaping was successful, rejecting otherwise.
 */
export function fork(arg) {
  const forkOptions = { silent: true };
  const shescapeOptions = {
    flagProtection: false,
    shell: false,
  };

  const shescape = new Shescape(shescapeOptions);
  const safeArg = shescape.escape(arg);

  return new Promise((resolve, reject) => {
    const echo = cp.fork(constants.echoScript, [safeArg], forkOptions);

    echo.on("error", (error) => {
      reject(error);
    });

    echo.stdout.on("data", (data) => {
      const result = data.toString();
      const expected = getExpectedOutput(arg, shescapeOptions);
      try {
        assert.strictEqual(result, expected);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * Test whether shescape escapes (and quotes, if necessary) the provided
 * argument correctly for the given shell for the `child_process.spawn`
 * function.
 *
 * @param {object} args The arguments.
 * @param {string} args.arg The CLI argument to test.
 * @param {string} args.shell The shell to test for.
 * @returns {Promise} Resolving if escaping was successful, rejecting otherwise.
 */
export function spawn({ arg, shell }) {
  const spawnOptions = { encoding: "utf8", shell };
  const shescapeOptions = {
    flagProtection: false,
    shell: spawnOptions.shell || false,
  };

  const shescape = new Shescape(shescapeOptions);
  const safeArg = spawnOptions.shell
    ? shescape.quote(arg)
    : shescape.escape(arg);

  return new Promise((resolve, reject) => {
    const child = cp.spawn(
      "node",
      [constants.echoScript, safeArg],
      spawnOptions,
    );

    child.on("error", (error) => {
      reject(error);
    });

    child.stdout.on("data", (data) => {
      const result = data.toString();
      const expected = getExpectedOutput(arg, shescapeOptions);
      try {
        assert.strictEqual(result, expected);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * Test whether shescape escapes (and quotes, if necessary) the provided
 * argument correctly for the given shell for the `child_process.spawnSync`
 * function.
 *
 * @param {object} args The arguments.
 * @param {string} args.arg The CLI argument to test.
 * @param {string} args.shell The shell to test for.
 * @returns {void} If escaping was successful.
 * @throws {Error} If escaping was not successful.
 */
export function spawnSync({ arg, shell }) {
  const spawnOptions = { encoding: "utf8", shell };
  const shescapeOptions = {
    flagProtection: false,
    shell: spawnOptions.shell || false,
  };

  const shescape = new Shescape(shescapeOptions);
  const safeArg = spawnOptions.shell
    ? shescape.quote(arg)
    : shescape.escape(arg);

  const child = cp.spawnSync(
    "node",
    [constants.echoScript, safeArg],
    spawnOptions,
  );

  if (child.error) {
    assert.fail(`an unexpected error occurred: ${child.error}`);
  } else {
    const result = child.stdout;
    const expected = getExpectedOutput(arg, shescapeOptions);
    assert.strictEqual(result, expected);
  }
}
