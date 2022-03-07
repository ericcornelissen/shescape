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
    let process;

    beforeEach(function () {
      process = { env: {} };
    });

    it("returns the unix module for platform 'aix'", function () {
      const platform = osAix;

      const result = platforms.getHelpersByPlatform({ platform, process });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'darwin'", function () {
      const platform = osDarwin;

      const result = platforms.getHelpersByPlatform({ platform, process });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'freebsd'", function () {
      const platform = osFreebsd;

      const result = platforms.getHelpersByPlatform({ platform, process });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'linux'", function () {
      const platform = osLinux;

      const result = platforms.getHelpersByPlatform({ platform, process });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'openbsd'", function () {
      const platform = osOpenbsd;

      const result = platforms.getHelpersByPlatform({ platform, process });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'sunos'", function () {
      const platform = osSunos;

      const result = platforms.getHelpersByPlatform({ platform, process });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the windows module for platform 'win32'", function () {
      const platform = osWin32;

      const result = platforms.getHelpersByPlatform({ platform, process });
      assert.deepStrictEqual(result, win);
    });

    it("returns the windows module for OS type 'cygwin'", function () {
      const platform = "foobar";
      process.env = { OSTYPE: ostypeCygwin };

      const result = platforms.getHelpersByPlatform({ platform, process });
      assert.deepStrictEqual(result, win);
    });

    it("returns the windows module for OS type 'msys'", function () {
      const platform = "foobar";
      process.env = { OSTYPE: ostypeMsys };

      const result = platforms.getHelpersByPlatform({ platform, process });
      assert.deepStrictEqual(result, win);
    });

    it("does not throw if the environment variables are missing", function () {
      const platform = "foobar";
      delete process.env;

      assert.doesNotThrow(() =>
        platforms.getHelpersByPlatform({ platform, process })
      );
    });
  });
});
