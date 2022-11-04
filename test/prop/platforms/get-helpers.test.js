/**
 * @overview Contains property tests for the functionality to get helpers
 * functions for a given platform.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";

import { arbitrary } from "./_.js";

import { getHelpersByPlatform } from "../../../src/platforms.js";

testProp(
  "supported platform",
  [arbitrary.env(), arbitrary.platform(), arbitrary.osType()],
  (t, env, platform, osType) => {
    env.osType = osType;

    const result = getHelpersByPlatform({
      env,
      platform,
    });

    t.is(typeof result.getBasename, "function");
    t.is(typeof result.getDefaultShell, "function");
    t.is(typeof result.getEscapeFunction, "function");
    t.is(typeof result.getFallbackShell, "function");
    t.is(typeof result.getQuoteFunction, "function");
  }
);

testProp(
  "environment variables are missing",
  [arbitrary.platform()],
  (t, platform) => {
    t.throws(() => getHelpersByPlatform({ platform }));
  }
);
