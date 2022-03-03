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

    it("returns the unix module for 'aix'", function () {
      const result = platforms.getHelpersByPlatform("aix");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'darwin'", function () {
      const result = platforms.getHelpersByPlatform("darwin");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'freebsd'", function () {
      const result = platforms.getHelpersByPlatform("freebsd");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'linux'", function () {
      const result = platforms.getHelpersByPlatform("linux");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'openbsd'", function () {
      const result = platforms.getHelpersByPlatform("openbsd");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'sunos'", function () {
      const result = platforms.getHelpersByPlatform("sunos");
      assert.deepStrictEqual(result, unix);
    });

    it("returns the windows module for 'win32'", function () {
      const result = platforms.getHelpersByPlatform("win32");
      assert.deepStrictEqual(result, win);
    });
  });
});
