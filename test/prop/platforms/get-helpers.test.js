/**
 * @overview Contains property tests for the functionality to get helpers
 * functions for a given platform.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";

import * as arbitraries from "./_arbitraries.js";
import * as common from "../common.js";

import { getHelpersByPlatform } from "../../../src/platforms.js";

testProp.before(common.configureFastCheck);

testProp(
  "supported platform",
  [arbitraries.env(), arbitraries.platform(), arbitraries.osType()],
  (t, env, platform, osType) => {
    env.osType = osType;

    const result = getHelpersByPlatform({
      env,
      platform,
    });

    t.is(typeof result.getDefaultShell, "function");
    t.is(typeof result.getEscapeFunction, "function");
    t.is(typeof result.getQuoteFunction, "function");
    t.is(typeof result.getShellName, "function");
  }
);

testProp(
  "env variables are missing",
  [arbitraries.platform()],
  (t, platform) => {
    t.throws(() => getHelpersByPlatform({ platform }));
  }
);
