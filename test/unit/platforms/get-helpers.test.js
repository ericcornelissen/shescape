/**
 * @overview Contains unit tests for the functionality to get helpers functions
 * for a given platform.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import * as macros from "./macros.js";
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
} from "../../common.js";

import { getHelpersByPlatform } from "../../../src/platforms.js";
import * as unix from "../../../src/unix.js";
import * as win from "../../../src/win.js";

test(macros.platformHelpers, {
  platform: osAix,
  process: { env: {} },
  expected: unix,
});

test(macros.platformHelpers, {
  platform: osDarwin,
  process: { env: {} },
  expected: unix,
});

test(macros.platformHelpers, {
  platform: osFreebsd,
  process: { env: {} },
  expected: unix,
});

test(macros.platformHelpers, {
  platform: osLinux,
  process: { env: {} },
  expected: unix,
});

test(macros.platformHelpers, {
  platform: osOpenbsd,
  process: { env: {} },
  expected: unix,
});

test(macros.platformHelpers, {
  platform: osSunos,
  process: { env: {} },
  expected: unix,
});

test(macros.platformHelpers, {
  platform: osWin32,
  process: { env: {} },
  expected: win,
});

test(macros.platformHelpers, {
  platform: "foobar",
  process: { env: { OSTYPE: ostypeCygwin } },
  expected: win,
});

test(macros.platformHelpers, {
  platform: "foobar",
  process: { env: { OSTYPE: ostypeMsys } },
  expected: win,
});

test("environment variables are missing", (t) => {
  const platform = "foobar";
  const process = {};

  t.is(process.env, undefined);
  t.throws(() => getHelpersByPlatform({ platform, process }));
});
