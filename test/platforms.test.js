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
  describe("::getPlatformHelpers", function () {
    // See the following for a list of all possible `platform` values:
    // https://nodejs.org/api/os.html#osplatform

    it("returns the unix module for 'aix'", function () {
      const result = platforms.getPlatformHelpers("aix");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'darwin'", function () {
      const result = platforms.getPlatformHelpers("darwin");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'freebsd'", function () {
      const result = platforms.getPlatformHelpers("freebsd");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'linux'", function () {
      const result = platforms.getPlatformHelpers("linux");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'openbsd'", function () {
      const result = platforms.getPlatformHelpers("openbsd");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'sunos'", function () {
      const result = platforms.getPlatformHelpers("sunos");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the windows module for 'win32'", function () {
      const result = platforms.getPlatformHelpers("win32");
      assert.deepStrictEqual(result, win);
    });
  });
});
