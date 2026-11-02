/**
 * @overview Contains unit tests for the functionality to get helpers functions
 * for a given platform.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";
import * as ppTestKit from "pp-test-kit/simulate";

import { getHelpersByPlatform } from "../../../src/internal/platforms.js";
import * as unix from "../../../src/internal/unix.js";
import * as win from "../../../src/internal/win.js";

import { arbitrary, constants } from "./_.js";

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

suite("getHelpersByPlatform", () => {
  for (const platform of unixPlatforms) {
    test(`platform is Unix for ${platform}`, () => {
      fc.assert(
        fc.property(arbitrary.env(), (env) => {
          delete env.OSTYPE;

          const result = getHelpersByPlatform({
            env,
            platform,
          });

          assert.deepEqual(result, unix);
        }),
      );
    });
  }

  for (const platform of winPlatforms) {
    test(`platform is Windows for ${platform}`, () => {
      fc.assert(
        fc.property(arbitrary.env(), (env) => {
          delete env.OSTYPE;

          const result = getHelpersByPlatform({
            env,
            platform,
          });

          assert.deepEqual(result, win);
        }),
      );
    });
  }

  for (const osType of winOsTypes) {
    test(`platform is Windows for OS type ${osType}`, () => {
      fc.assert(
        fc.property(arbitrary.env(), arbitrary.platform(), (env, platform) => {
          env.OSTYPE = osType;

          const result = getHelpersByPlatform({
            env,
            platform,
          });

          assert.deepEqual(result, win);
        }),
      );
    });
  }

  test("env.OSTYPE is polluted", () => {
    fc.assert(
      fc.property(
        arbitrary.env({ keys: ["OSTYPE"] }),
        fc.constantFrom(...winOsTypes),
        fc.constantFrom(...unixPlatforms),
        (env, prototypeOstype, platform) => {
          fc.pre(![...winOsTypes].includes(env.OSTYPE));

          env = ppTestKit.simulatePollution(env, {
            property: "OSTYPE",
            value: prototypeOstype,
          });

          const result = getHelpersByPlatform({
            env,
            platform,
          });

          assert.deepEqual(result, unix);
        },
      ),
    );
  });
});
