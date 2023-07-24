/**
 * @overview Contains unit tests for the functionality to get helpers functions
 * for a given platform.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary, constants } from "./_.js";

import { isPlatformSupported } from "../../../src/platforms.js";

for (const platform of [
  constants.osDarwin,
  constants.osLinux,
  constants.osWin32,
]) {
  testProp(
    `platform ${platform} is officially supported`,
    [arbitrary.env()],
    (t, env) => {
      delete env.OSTYPE;

      const result = isPlatformSupported({
        env,
        platform,
      });

      t.true(result);
    },
  );
}

for (const osType of [constants.ostypeCygwin, constants.ostypeMsys]) {
  testProp(
    `platform with OS type ${osType} is officially supported`,
    [arbitrary.env(), arbitrary.platform()],
    (t, env, platform) => {
      env.OSTYPE = osType;

      const result = isPlatformSupported({
        env,
        platform,
      });

      t.true(result);
    },
  );
}

for (const platform of [
  constants.osAix,
  constants.osFreebsd,
  constants.osOpenbsd,
  constants.osSunos,
]) {
  testProp(
    `platform ${platform} is NOT officially supported`,
    [arbitrary.env()],
    (t, env) => {
      delete env.OSTYPE;

      const result = isPlatformSupported({
        env,
        platform,
      });

      t.false(result);
    },
  );
}
