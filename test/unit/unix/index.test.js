/**
 * @overview Contains unit tests for the general Unix-specific functionality.
 * @license MIT
 */

import path from "node:path";

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, constants } from "./_.js";

import * as bash from "../../../src/unix/bash.js";
import * as csh from "../../../src/unix/csh.js";
import * as dash from "../../../src/unix/dash.js";
import * as unix from "../../../src/unix/index.js";
import * as zsh from "../../../src/unix/zsh.js";

test("the default shell", (t) => {
  const result = unix.getDefaultShell();
  t.is(result, "/bin/sh");
});

test("escape function for bash", (t) => {
  let options = { interpolation: false, quoted: false };
  t.is(
    unix.getEscapeFunction(constants.binBash, options),
    bash.getEscapeFunction(options)
  );

  options = { interpolation: true, quoted: false };
  t.is(
    unix.getEscapeFunction(constants.binBash, options),
    bash.getEscapeFunction(options)
  );

  options = { interpolation: false, quoted: true };
  t.is(
    unix.getEscapeFunction(constants.binBash, options),
    bash.getEscapeFunction(options)
  );
});

test("escape function for csh", (t) => {
  let options = { interpolation: false, quoted: false };
  t.is(
    unix.getEscapeFunction(constants.binCsh, options),
    csh.getEscapeFunction(options)
  );

  options = { interpolation: true, quoted: false };
  t.is(
    unix.getEscapeFunction(constants.binCsh, options),
    csh.getEscapeFunction(options)
  );

  options = { interpolation: false, quoted: true };
  t.is(
    unix.getEscapeFunction(constants.binCsh, options),
    csh.getEscapeFunction(options)
  );
});

test("escape function for dash", (t) => {
  let options = { interpolation: false, quoted: false };
  t.is(
    unix.getEscapeFunction(constants.binDash, options),
    dash.getEscapeFunction(options)
  );

  options = { interpolation: true, quoted: false };
  t.is(
    unix.getEscapeFunction(constants.binDash, options),
    dash.getEscapeFunction(options)
  );

  options = { interpolation: false, quoted: true };
  t.is(
    unix.getEscapeFunction(constants.binDash, options),
    dash.getEscapeFunction(options)
  );
});

test("escape function for zsh", (t) => {
  let options = { interpolation: false, quoted: false };
  t.is(
    unix.getEscapeFunction(constants.binZsh, options),
    zsh.getEscapeFunction(options)
  );

  options = { interpolation: true, quoted: false };
  t.is(
    unix.getEscapeFunction(constants.binZsh, options),
    zsh.getEscapeFunction(options)
  );

  options = { interpolation: false, quoted: true };
  t.is(
    unix.getEscapeFunction(constants.binZsh, options),
    zsh.getEscapeFunction(options)
  );
});

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedUnixShell(), fc.boolean(), fc.boolean()],
  (t, shellName, interpolation, quoted) => {
    const result = unix.getEscapeFunction(shellName, { interpolation, quoted });
    t.is(result, undefined);
  }
);

test("quote function for bash", (t) => {
  const actual = unix.getQuoteFunction(constants.binBash);
  const expected = bash.getQuoteFunction();
  t.is(actual, expected);
});

test("quote function for csh", (t) => {
  const actual = unix.getQuoteFunction(constants.binCsh);
  const expected = csh.getQuoteFunction();
  t.is(actual, expected);
});

test("quote function for dash", (t) => {
  const actual = unix.getQuoteFunction(constants.binDash);
  const expected = dash.getQuoteFunction();
  t.is(actual, expected);
});

test("quote function for zsh", (t) => {
  const actual = unix.getQuoteFunction(constants.binZsh);
  const expected = zsh.getQuoteFunction();
  t.is(actual, expected);
});

testProp(
  "quote function for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getQuoteFunction(shellName);
    t.is(result, undefined);
  }
);

testProp(
  "get shell name for supported shell",
  [arbitrary.env(), arbitrary.unixPath(), arbitrary.unixShell()],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = unix.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, shell);
  }
);

testProp(
  "get shell name for unsupported shell",
  [arbitrary.env(), arbitrary.unixPath(), arbitrary.unsupportedUnixShell()],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = unix.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, constants.binBash);
  }
);

testProp(
  "resolving the shell",
  [arbitrary.env(), fc.string()],
  (t, env, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns("foobar");

    unix.getShellName({ env, shell }, { resolveExecutable });
    t.true(
      resolveExecutable.calledWithExactly(
        { executable: shell },
        {
          exists: sinon.match.func,
          readlink: sinon.match.func,
          which: sinon.match.func,
        }
      )
    );
  }
);
