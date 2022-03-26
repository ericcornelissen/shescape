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
    process: {
      env: {},
    },
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osDarwin,
    process: {
      env: {},
    },
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osFreebsd,
    process: {
      env: {},
    },
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osLinux,
    process: {
      env: {},
    },
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osOpenbsd,
    process: {
      env: {},
    },
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osSunos,
    process: {
      env: {},
    },
  },
  expected: unix,
});

test(macros.platformHelpers, {
  input: {
    platform: osWin32,
    process: {
      env: {},
    },
  },
  expected: win,
});

test(macros.platformHelpers, {
  input: {
    platform: "a",
    process: {
      env: { OSTYPE: ostypeCygwin },
    },
  },
  expected: win,
});

test(macros.platformHelpers, {
  input: {
    platform: "a",
    process: {
      env: { OSTYPE: ostypeMsys },
    },
  },
  expected: win,
});

test("environment variables are missing", (t) => {
  const platform = "a";
  const process = {};

  t.is(process.env, undefined);
  t.throws(() => getHelpersByPlatform({ platform, process }));
});
