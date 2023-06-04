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
  let options = { flagProtection: false, interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binBash, options),
    bash.getEscapeFunction(options)
  );

  options = { flagProtection: false, interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binBash, options),
    bash.getEscapeFunction(options)
  );

  // options = { flagProtection: true, interpolation: false };
  // t.is(
  //   unix.getEscapeFunction(constants.binBash, options),
  //   bash.getEscapeFunction(options)
  // );
  //
  // options = { flagProtection: true, interpolation: true };
  // t.is(
  //   unix.getEscapeFunction(constants.binBash, options),
  //   bash.getEscapeFunction(options)
  // );
});

test("escape function for csh", (t) => {
  let options = { flagProtection: false, interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binCsh, options),
    csh.getEscapeFunction(options)
  );

  options = { flagProtection: false, interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binCsh, options),
    csh.getEscapeFunction(options)
  );

  // options = { flagProtection: true, interpolation: false };
  // t.is(
  //   unix.getEscapeFunction(constants.binCsh, options),
  //   csh.getEscapeFunction(options)
  // );
  //
  // options = { flagProtection: true, interpolation: true };
  // t.is(
  //   unix.getEscapeFunction(constants.binCsh, options),
  //   csh.getEscapeFunction(options)
  // );
});

test("escape function for dash", (t) => {
  let options = { flagProtection: false, interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binDash, options),
    dash.getEscapeFunction(options)
  );

  options = { flagProtection: false, interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binDash, options),
    dash.getEscapeFunction(options)
  );

  // options = { flagProtection: true, interpolation: false };
  // t.is(
  //   unix.getEscapeFunction(constants.binDash, options),
  //   dash.getEscapeFunction(options)
  // );
  //
  // options = { flagProtection: true, interpolation: true };
  // t.is(
  //   unix.getEscapeFunction(constants.binDash, options),
  //   dash.getEscapeFunction(options)
  // );
});

test("escape function for zsh", (t) => {
  let options = { flagProtection: false, interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binZsh, options),
    zsh.getEscapeFunction(options)
  );

  options = { flagProtection: false, interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binZsh, options),
    zsh.getEscapeFunction(options)
  );

  // options = { flagProtection: true, interpolation: false };
  // t.is(
  //   unix.getEscapeFunction(constants.binZsh, options),
  //   zsh.getEscapeFunction(options)
  // );
  //
  // options = { flagProtection: true, interpolation: true };
  // t.is(
  //   unix.getEscapeFunction(constants.binZsh, options),
  //   zsh.getEscapeFunction(options)
  // );
});

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedUnixShell(), fc.boolean(), fc.boolean()],
  (t, shellName, flagProtection, interpolation) => {
    const options = { flagProtection, interpolation };
    const result = unix.getEscapeFunction(shellName, options);
    t.is(result, undefined);
  }
);

test("quote function for bash", (t) => {
  let options = { flagProtection: false };
  t.is(
    unix.getQuoteFunction(constants.binBash, options),
    bash.getQuoteFunction(options)
  );

  // options = { flagProtection: true };
  // t.is(
  //   unix.getQuoteFunction(constants.binBash, options),
  //   bash.getQuoteFunction(options)
  // );
});

test("quote function for csh", (t) => {
  let options = { flagProtection: false };
  t.is(
    unix.getQuoteFunction(constants.binCsh, options),
    csh.getQuoteFunction(options)
  );

  // options = { flagProtection: true };
  // t.is(
  //   unix.getQuoteFunction(constants.binCsh, options),
  //   csh.getQuoteFunction(options)
  // );
});

test("quote function for dash", (t) => {
  let options = { flagProtection: false };
  t.is(
    unix.getQuoteFunction(constants.binDash, options),
    dash.getQuoteFunction(options)
  );

  // options = { flagProtection: true };
  // t.is(
  //   unix.getQuoteFunction(constants.binDash, options),
  //   dash.getQuoteFunction(options)
  // );
});

test("quote function for zsh", (t) => {
  let options = { flagProtection: false };
  t.is(
    unix.getQuoteFunction(constants.binZsh, options),
    zsh.getQuoteFunction(options)
  );

  // options = { flagProtection: true };
  // t.is(
  //   unix.getQuoteFunction(constants.binZsh, options),
  //   zsh.getQuoteFunction(options)
  // );
});

testProp(
  "quote function for unsupported shell",
  [arbitrary.unsupportedUnixShell(), fc.boolean()],
  (t, shellName, flagProtection) => {
    const options = { flagProtection };
    const result = unix.getQuoteFunction(shellName, options);
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
