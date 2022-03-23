/**
 * @overview Contains property tests for `./src/platforms.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";

import {
  osAix,
  osDarwin,
  osFreebsd,
  osLinux,
  osOpenbsd,
  osSunos,
  ostypeCygwin,
  ostypeMsys,
  osWin32,
} from "./common.js";

import * as platforms from "../src/platforms.js";

describe("platforms.js", function () {
  const allPlatforms = [
    osAix,
    osDarwin,
    osFreebsd,
    osLinux,
    osOpenbsd,
    osSunos,
    osWin32,
  ];
  const osTypes = [undefined, ostypeCygwin, ostypeMsys];

  before(function () {
    fc.configureGlobal({
      numRuns: 10 ** 5,
      interruptAfterTimeLimit: 1900,
      markInterruptAsFailure: false,
    });
  });

  describe("::getHelpersByPlatform", function () {
    it("always returns an object with the expected functions", function () {
      fc.assert(
        fc.property(
          fc.object(),
          fc.object(),
          fc.constantFrom(...allPlatforms),
          fc.constantFrom(...osTypes),
          function (process, env, platform, osType) {
            env.osType = osType;
            process.env = env;

            const result = platforms.getHelpersByPlatform({
              platform,
              process,
            });

            assert.ok(typeof result.getDefaultShell === "function");
            assert.ok(typeof result.getEscapeFunction === "function");
            assert.ok(typeof result.getQuoteFunction === "function");
            assert.ok(typeof result.getShellName === "function");
          }
        )
      );
    });
  });
});
