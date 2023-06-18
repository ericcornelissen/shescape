/**
 * @overview Contains integration tests for `Shescape#escapeAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants, macros } from "./_.js";

import { Shescape as ShescapeEsm } from "../../index.js";
import { Shescape as ShescapeCjs } from "../../index.cjs";

const cases = [
  { Shescape: ShescapeCjs, type: "cjs" },
  { Shescape: ShescapeEsm, type: "esm" },
];

for (const { Shescape, type } of cases) {
  // TODO test(type, macros.escapeAllSuccess, { escapeAll });
  // TODO test(type, macros.escapeAllNonArray, { escapeAll });
  // TODO test(type, macros.escapeAllFlags, { escapeAll });

  testProp(
    `return values (${type})`,
    [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
    (t, args, options) => {
      const shescape = new Shescape(options);
      const result = shescape.escapeAll(args);
      t.deepEqual(
        result,
        args.map((arg) => shescape.escape(arg))
      );
    }
  );

  testProp(
    `return size (${type})`,
    [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
    (t, args, options) => {
      const shescape = new Shescape(options);
      const result = shescape.escapeAll(args);
      t.is(result.length, args.length);
    }
  );

  testProp(
    `extra arguments (${type})`,
    [
      fc.array(arbitrary.shescapeArg()),
      arbitrary.shescapeArg(),
      arbitrary.shescapeOptions(),
    ],
    (t, args, extraArg, options) => {
      const shescape = new Shescape(options);
      const r1 = shescape.escapeAll(args);

      const r2 = shescape.escapeAll([...args, extraArg]);
      t.deepEqual(r2, [...r1, shescape.escape(extraArg)]);

      const r3 = shescape.escapeAll([extraArg, ...args]);
      t.deepEqual(r3, [shescape.escape(extraArg), ...r1]);
    }
  );

  testProp(
    `non-array input (${type})`,
    [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
    (t, arg, options) => {
      const shescape = new Shescape(options);
      const result = shescape.escapeAll(arg);
      t.is(result.length, 1);

      const entry = result[0];
      t.is(entry, shescape.escape(arg));
    }
  );

  test(`invalid arguments (${type})`, (t) => {
    const shescape = new Shescape();
    for (const { value } of constants.illegalArguments) {
      t.throws(() => shescape.escapeAll([value]));
      t.throws(() => shescape.escapeAll(value));
    }
  });

  test(type, macros.prototypePollution, (_, payload) => {
    const shescape = new Shescape(payload);
    shescape.escapeAll(["a"]);
  });
}

testProp(
  "esm === cjs",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const shescapeEsm = new ShescapeEsm(options);
    const shescapeCjs = new ShescapeCjs(options);
    const resultEsm = shescapeEsm.escapeAll(args);
    const resultCjs = shescapeCjs.escapeAll(args);
    t.deepEqual(resultEsm, resultCjs);
  }
);
