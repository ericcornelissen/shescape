/**
 * @overview Contains unit tests for the functionality to get helpers functions
 * for a given platform.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary, constants } from "./_.js";

import { getHelpersByPlatform } from "../../../src/platforms.js";
import * as unix from "../../../src/unix.js";
import * as win from "../../../src/win.js";

for (const platform of [
  constants.osAix,
  constants.osDarwin,
  constants.osFreebsd,
  constants.osLinux,
  constants.osOpenbsd,
  constants.osSunos,
]) {
  testProp(`platform is Unix for ${platform}`, [arbitrary.env()], (t, env) => {
    delete env.OSTYPE;

    const result = getHelpersByPlatform({
      env,
      platform,
    });

    t.deepEqual(result, unix);
  });
}

for (const platform of [constants.osWin32]) {
  testProp(
    `platform is Windows for ${platform}`,
    [arbitrary.env()],
    (t, env) => {
      delete env.OSTYPE;

      const result = getHelpersByPlatform({
        env,
        platform,
      });

      t.deepEqual(result, win);
    },
  );
}

for (const osType of [constants.ostypeCygwin, constants.ostypeMsys]) {
  testProp(
    `platform is Windows for OS type ${osType}`,
    [arbitrary.env(), arbitrary.platform()],
    (t, env, platform) => {
      env.OSTYPE = osType;

      const result = getHelpersByPlatform({
        env,
        platform,
      });

      t.deepEqual(result, win);
    },
  );
}
