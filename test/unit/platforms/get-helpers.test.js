/**
 * @overview Contains unit tests for the functionality to get helpers functions
 * for a given platform.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import * as macros from "./_macros.js";
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
} from "../../common.cjs";

import { getHelpersByPlatform } from "../../../src/platforms.js";
import * as unix from "../../../src/unix.js";
import * as win from "../../../src/win.js";

test(macros.platformHelpers, {
  input: {
    platform: osAix,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osDarwin,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osFreebsd,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osLinux,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osOpenbsd,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osSunos,
    env: {},
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osWin32,
    env: {},
  },
  expected: win,
});

test(macros.platformHelpers, {
  input: {
    platform: "a",
    env: { OSTYPE: ostypeCygwin },
  },
  expected: win,
});

test(macros.platformHelpers, {
  input: {
    platform: "a",
    env: { OSTYPE: ostypeMsys },
  },
  expected: win,
});

test("environment variables are missing", (t) => {
  const platform = "a";

  t.throws(() => getHelpersByPlatform({ platform }));
});
