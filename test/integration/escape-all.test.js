/**
 * @overview Contains integration tests for `shescape.escapeAll`.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants, macros } from "./_.js";

import { escape, escapeAll as escapeAllEsm } from "../../index.js";
import { escapeAll as escapeAllCjs } from "../../index.cjs";

const cases = [
  { escapeAll: escapeAllCjs, type: "cjs" },
  { escapeAll: escapeAllEsm, type: "esm" },
];

for (const { escapeAll, type } of cases) {
  test(type, macros.escapeAllSuccess, { escapeAll });
  test(type, macros.escapeAllNonArray, { escapeAll });

  testProp(
    `return values (${type})`,
    [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
    (t, args, options) => {
      const result = escapeAll(args, options);
      t.deepEqual(
        result,
        args.map((arg) => escape(arg, options))
      );
    }
  );

  testProp(
    `return size (${type})`,
    [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
    (t, args, options) => {
      const result = escapeAll(args, options);
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
      const r1 = escapeAll(args, options);

      const r2 = escapeAll([...args, extraArg], options);
      t.deepEqual(r2, [...r1, escape(extraArg, options)]);

      const r3 = escapeAll([extraArg, ...args], options);
      t.deepEqual(r3, [escape(extraArg, options), ...r1]);
    }
  );

  testProp(
    `non-array input (${type})`,
    [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
    (t, arg, options) => {
      const result = escapeAll(arg, options);
      t.is(result.length, 1);

      const entry = result[0];
      t.is(entry, escape(arg, options));
    }
  );

  test(`invalid arguments (${type})`, (t) => {
    for (const { value } of constants.illegalArguments) {
      t.throws(() => escapeAll([value]));
      t.throws(() => escapeAll(value));
    }
  });

  test(type, macros.prototypePollution, (_, payload) => {
    escapeAll(["a"], payload);
  });

  test(
    type,
    macros.poisoning,
    () => {
      escapeAll(["a"]);
    },
    { ignore: ["process.getgid", "process.getuid"] }
  );
}
