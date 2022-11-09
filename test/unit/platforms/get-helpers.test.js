/**
 * @overview Contains unit tests for the functionality to get helpers functions
 * for a given platform.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";

import { arbitrary } from "./_.js";

import { getHelpersByPlatform } from "../../../src/platforms.js";
import * as unix from "../../../src/unix.js";
import * as win from "../../../src/win.js";

testProp(
  "platform is Unix",
  [arbitrary.env(), arbitrary.platform("unix")],
  (t, env, platform) => {
    delete env.OSTYPE;

    const result = getHelpersByPlatform({
      env,
      platform,
    });

    t.deepEqual(result, unix);
  }
);

testProp(
  "platform is Windows",
  [arbitrary.env(), arbitrary.platform("win")],
  (t, env, platform) => {
    delete env.OSTYPE;

    const result = getHelpersByPlatform({
      env,
      platform,
    });

    t.deepEqual(result, win);
  }
);

testProp(
  "OS type is Windows",
  [arbitrary.env(), arbitrary.platform(), arbitrary.osType("win")],
  (t, env, platform, osType) => {
    env.OSTYPE = osType;

    const result = getHelpersByPlatform({
      env,
      platform,
    });

    t.deepEqual(result, win);
  }
);

testProp(
  "environment variables are missing",
  [arbitrary.platform()],
  (t, platform) => {
    t.throws(() => getHelpersByPlatform({ platform }));
  }
);
