/**
 * @overview Contains unit tests for the functionality to get helpers functions
 * for a given platform.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import { constants, macros } from "./_.js";

import { getHelpersByPlatform } from "../../../src/platforms.js";
import * as unix from "../../../src/unix.js";
import * as win from "../../../src/win.js";

test(macros.platformHelpers, {
  input: {
    platform: constants.osAix,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: constants.osDarwin,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: constants.osFreebsd,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: constants.osLinux,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: constants.osOpenbsd,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: constants.osSunos,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: constants.osWin32,
    env: {},
  },
  expected: win,
});

test(macros.platformHelpers, {
  input: {
    platform: "a",
    env: { OSTYPE: constants.ostypeCygwin },
  },
  expected: win,
});

test(macros.platformHelpers, {
  input: {
    platform: "a",
    env: { OSTYPE: constants.ostypeMsys },
  },
  expected: win,
});

test("environment variables are missing", (t) => {
  const platform = "a";

  t.throws(() => getHelpersByPlatform({ platform }));
});
