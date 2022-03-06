/**
 * @overview Contains unit tests for `./src/platforms.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";

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
import * as unix from "../src/unix.js";
import * as win from "../src/win.js";

describe("platforms.js", function () {
  describe("::getHelpersByPlatform", function () {
    // See the following for a list of all possible `platform` values:
    // https://nodejs.org/api/os.html#osplatform

    let process;

    beforeEach(function () {
      process = { env: {} };
    });

    it("returns the unix module for platform 'aix'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: osAix,
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'darwin'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: osDarwin,
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'freebsd'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: osFreebsd,
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'linux'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: osLinux,
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'openbsd'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: osOpenbsd,
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'sunos'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: osSunos,
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the windows module for platform 'win32'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: osWin32,
        process,
      });
      assert.deepStrictEqual(result, win);
    });

    it("returns the windows module for OS type 'cygwin'", function () {
      process.env = { OSTYPE: ostypeCygwin };

      const result = platforms.getHelpersByPlatform({ process });
      assert.deepStrictEqual(result, win);
    });

    it("returns the windows module for OS type 'msys'", function () {
      process.env = { OSTYPE: ostypeMsys };

      const result = platforms.getHelpersByPlatform({ process });
      assert.deepStrictEqual(result, win);
    });
  });
});
