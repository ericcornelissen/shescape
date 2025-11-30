// Configuration file for Rollup (https://rollupjs.org/)

const external = [
  "node:fs",
  "node:os",
  "node:path",
  "node:process",
  "node:util",
  "which",
];

export default [
  {
    input: "src/index.js",
    output: {
      file: "src/index.cjs",
      format: "cjs",
    },
    external,
  },
  {
    input: "src/stateless.js",
    output: {
      file: "src/stateless.cjs",
      format: "cjs",
    },
    external,
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
