// Configuration file for Rollup (https://rollupjs.org/)

import commonjs from "@rollup/plugin-commonjs";

const external = [
  "@ericcornelissen/lregexp",
  "node:fs",
  "node:os",
  "node:path",
  "node:process",
  "node:util",
  "which",
];

const plugins = [commonjs()];

export default [
  {
    input: "src/index.js",
    output: {
      file: "src/index.cjs",
      format: "cjs",
    },
    external,
    plugins,
  },
  {
    input: "src/stateless.js",
    output: {
      file: "src/stateless.cjs",
      format: "cjs",
    },
    external,
    plugins,
  },
  {
    input: "src/testing.js",
    output: {
      file: "src/testing.cjs",
      format: "cjs",
    },
    external,
  },
];
