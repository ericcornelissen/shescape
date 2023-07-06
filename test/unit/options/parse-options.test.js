/**
 * @overview Contains unit tests for the functionality to parse options.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary } from "./_.js";

import { resolveExecutable } from "../../../src/executables.js";
import { parseOptions } from "../../../src/options.js";

const arbitraryInput = () =>
  fc
    .tuple(arbitrary.shescapeOptions(), arbitrary.env())
    .map(([options, env]) => {
      options = options || {};
      return { options, process: { env } };
    });

test.beforeEach((t) => {
  const getDefaultShell = sinon.stub();
  const getShellName = sinon.stub();

  t.context.deps = { getDefaultShell, getShellName };
});

testProp("flag protection not specified", [arbitraryInput()], (t, args) => {
  delete args.options.flagProtection;

  const result = parseOptions(args, t.context.deps);
  t.is(result.flagProtection, false);
});

testProp("flag protection set to true", [arbitraryInput()], (t, args) => {
  args.options.flagProtection = true;

  const result = parseOptions(args, t.context.deps);
  t.is(result.flagProtection, true);
});

testProp("flag protection set to false", [arbitraryInput()], (t, args) => {
  args.options.flagProtection = false;

  const result = parseOptions(args, t.context.deps);
  t.is(result.flagProtection, false);
});

testProp("interpolation not specified", [arbitraryInput()], (t, args) => {
  delete args.options.interpolation;

  const result = parseOptions(args, t.context.deps);
  t.is(result.interpolation, false);
});

testProp("interpolation set to true", [arbitraryInput()], (t, args) => {
  args.options.interpolation = true;

  const result = parseOptions(args, t.context.deps);
  t.is(result.interpolation, true);
});

testProp("interpolation set to false", [arbitraryInput()], (t, args) => {
  args.options.interpolation = false;

  const result = parseOptions(args, t.context.deps);
  t.is(result.interpolation, false);
});

testProp(
  "shell is not specified",
  [
    arbitraryInput(),
    fc.constantFrom(undefined, true, false),
    fc.string(),
    fc.string(),
  ],
  (t, args, providedShell, defaultShell, shellName) => {
    t.context.deps.getDefaultShell.resetHistory();
    t.context.deps.getDefaultShell.returns(defaultShell);
    t.context.deps.getShellName.resetHistory();
    t.context.deps.getShellName.returns(shellName);

    const env = args.process.env;
    args.options.shell = providedShell;

    const result = parseOptions(args, t.context.deps);
    t.is(t.context.deps.getDefaultShell.callCount, 1);
    t.true(t.context.deps.getDefaultShell.calledWithExactly({ env }));
    t.is(t.context.deps.getShellName.callCount, 1);
    t.true(
      t.context.deps.getShellName.calledWithExactly(
        { shell: defaultShell },
        { resolveExecutable },
      ),
    );
    t.is(result.shellName, shellName);
  },
);

testProp(
  "shell is specified",
  [arbitraryInput(), fc.string(), fc.string()],
  (t, args, providedShell, shellName) => {
    t.context.deps.getShellName.resetHistory();
    t.context.deps.getShellName.returns(shellName);

    args.options.shell = providedShell;

    const result = parseOptions(args, t.context.deps);
    t.is(t.context.deps.getDefaultShell.callCount, 0);
    t.is(t.context.deps.getShellName.callCount, 1);
    t.true(
      t.context.deps.getShellName.calledWithExactly(
        { shell: providedShell },
        { resolveExecutable },
      ),
    );
    t.is(result.shellName, shellName);
  },
);
