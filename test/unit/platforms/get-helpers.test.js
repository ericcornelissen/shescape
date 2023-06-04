/**
 * @overview Contains unit tests for the functionality to get helpers functions
 * for a given platform.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary, constants } from "./_.js";

import { getHelpersByPlatform } from "../../../src/platforms.js";
import * as unix from "../../../src/unix/index.js";
import * as win from "../../../src/win/index.js";

for (const platform of [
  constants.osAix,
  constants.osDarwin,
  constants.osFreebsd,
  constants.osLinux,
  constants.osOpenbsd,
  constants.osSunos,
]) {
  testProp("platform is Unix", [arbitrary.env()], (t, env) => {
    delete env.OSTYPE;

    const result = getHelpersByPlatform({
      env,
      platform,
    });

    t.deepEqual(result, unix);
  });
}

for (const platform of [constants.osWin32]) {
  testProp("platform is Windows", [arbitrary.env()], (t, env) => {
    delete env.OSTYPE;

    const result = getHelpersByPlatform({
      env,
      platform,
    });

    t.deepEqual(result, win);
  });
}

for (const osType of [constants.ostypeCygwin, constants.ostypeMsys]) {
  testProp(
    "os type is Windows",
    [arbitrary.env(), arbitrary.platform()],
    (t, env, platform) => {
      env.OSTYPE = osType;

      const result = getHelpersByPlatform({
        env,
        platform,
      });

      t.deepEqual(result, win);
    }
  );
}

testProp(
  "environment variables are missing",
  [arbitrary.platform()],
  (t, platform) => {
    t.throws(() => getHelpersByPlatform({ platform }));
  }
);
