/**
 * @overview Contains unit tests for the functionality to get helpers functions
 * for a given platform.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import * as ppTestKit from "pp-test-kit/simulate";

import { arbitrary, constants } from "./_.js";

import { getHelpersByPlatform } from "../../../src/internal/platforms.js";
import * as unix from "../../../src/internal/unix.js";
import * as win from "../../../src/internal/win.js";

const unixPlatforms = [
  constants.osAix,
  constants.osDarwin,
  constants.osFreebsd,
  constants.osLinux,
  constants.osOpenbsd,
  constants.osSunos,
];
const winPlatforms = [constants.osWin32];
const winOsTypes = [constants.ostypeCygwin, constants.ostypeMsys];

for (const platform of unixPlatforms) {
  testProp(`platform is Unix for ${platform}`, [arbitrary.env()], (t, env) => {
    delete env.OSTYPE;

    const result = getHelpersByPlatform({
      env,
      platform,
    });

    t.deepEqual(result, unix);
  });
}

for (const platform of winPlatforms) {
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

for (const osType of winOsTypes) {
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

testProp(
  "env.OSTYPE is polluted",
  [
    arbitrary.env({ keys: ["OSTYPE"] }),
    fc.constantFrom(...winOsTypes),
    fc.constantFrom(...unixPlatforms),
  ],
  (t, env, prototypeOstype, platform) => {
    fc.pre(![...winOsTypes].includes(env.OSTYPE));

    env = ppTestKit.simulatePollution({
      subject: env,
      property: "OSTYPE",
      value: prototypeOstype,
    });

    const result = getHelpersByPlatform({
      env,
      platform,
    });

    t.deepEqual(result, unix);
  },
);
