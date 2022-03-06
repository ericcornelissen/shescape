/**
 * @overview Contains unit tests for `./src/platforms.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";

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
        platform: "aix",
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'darwin'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: "darwin",
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'freebsd'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: "freebsd",
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'linux'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: "linux",
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'openbsd'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: "openbsd",
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'sunos'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: "sunos",
        process,
      });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the windows module for platform 'win32'", function () {
      const result = platforms.getHelpersByPlatform({
        platform: "win32",
        process,
      });
      assert.deepStrictEqual(result, win);
    });

    it("returns the windows module for OS type 'cygwin'", function () {
      process.env = { OSTYPE: "cygwin" };

      const result = platforms.getHelpersByPlatform({ process });
      assert.deepStrictEqual(result, win);
    });

    it("returns the windows module for OS type 'msys'", function () {
      process.env = { OSTYPE: "msys" };

      const result = platforms.getHelpersByPlatform({ process });
      assert.deepStrictEqual(result, win);
    });
  });
});
