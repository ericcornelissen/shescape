// Configuration file for Rollup (https://rollupjs.org/)

const external = [
  "@ericcornelissen/lregexp",
  "node:fs",
  "node:os",
  "node:path",
  "node:process",
  "node:util",
  "which",
];

export default [
  {
    input: "src/modules/index.js",
    output: {
      file: "src/modules/index.cjs",
      format: "cjs",
    },
    external,
  },
  {
    input: "src/modules/stateless.js",
    output: {
      file: "src/modules/stateless.cjs",
      format: "cjs",
    },
    external,
  },
  {
    input: "src/modules/testing.js",
    output: {
      file: "src/modules/testing.cjs",
      format: "cjs",
    },
    external,
  },
];
