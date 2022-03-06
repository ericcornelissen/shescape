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
      const result = platforms.getHelpersByPlatform({ platform: "aix" });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'darwin'", function () {
      const result = platforms.getHelpersByPlatform({ platform: "darwin" });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'freebsd'", function () {
      const result = platforms.getHelpersByPlatform({ platform: "freebsd" });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'linux'", function () {
      const result = platforms.getHelpersByPlatform({ platform: "linux" });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'openbsd'", function () {
      const result = platforms.getHelpersByPlatform({ platform: "openbsd" });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for 'sunos'", function () {
      const result = platforms.getHelpersByPlatform({ platform: "sunos" });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the windows module for 'win32'", function () {
      const result = platforms.getHelpersByPlatform({ platform: "win32" });
      assert.deepStrictEqual(result, win);
    });
  });
});
