/**
 * @overview Contains unit tests for `./src/platforms.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "node:assert";

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
    let env;

    beforeEach(function () {
      env = {};
    });

    it("returns the unix module for platform 'aix'", function () {
      const platform = osAix;

      const result = platforms.getHelpersByPlatform({ env, platform });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'darwin'", function () {
      const platform = osDarwin;

      const result = platforms.getHelpersByPlatform({ env, platform });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'freebsd'", function () {
      const platform = osFreebsd;

      const result = platforms.getHelpersByPlatform({ env, platform });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'linux'", function () {
      const platform = osLinux;

      const result = platforms.getHelpersByPlatform({ env, platform });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'openbsd'", function () {
      const platform = osOpenbsd;

      const result = platforms.getHelpersByPlatform({ env, platform });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the unix module for platform 'sunos'", function () {
      const platform = osSunos;

      const result = platforms.getHelpersByPlatform({ env, platform });
      assert.deepStrictEqual(result, unix);
    });

    it("returns the windows module for platform 'win32'", function () {
      const platform = osWin32;

      const result = platforms.getHelpersByPlatform({ env, platform });
      assert.deepStrictEqual(result, win);
    });

    it("returns the windows module for OS type 'cygwin'", function () {
      const platform = "foobar";
      env = { OSTYPE: ostypeCygwin };

      const result = platforms.getHelpersByPlatform({ env, platform });
      assert.deepStrictEqual(result, win);
    });

    it("returns the windows module for OS type 'msys'", function () {
      const platform = "foobar";
      env = { OSTYPE: ostypeMsys };

      const result = platforms.getHelpersByPlatform({ env, platform });
      assert.deepStrictEqual(result, win);
    });

    it("does throw if the environment variables are missing", function () {
      const platform = "foobar";

      assert.throws(() => platforms.getHelpersByPlatform({ platform }));
    });
  });
});
