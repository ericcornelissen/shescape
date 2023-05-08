// Check out rollup.js at: https://rollupjs.org/guide/en/

const external = ["fs", "os", "path", "path/win32", "process", "util", "which"];

export default [
  {
    input: "experimental.js",
    output: {
      file: "experimental.cjs",
      format: "cjs",
    },
    external,
  },
  {
    input: "index.js",
    output: {
      file: "index.cjs",
      format: "cjs",
    },
    external,
  },
  {
    input: "testing.js",
    output: {
      file: "testing.cjs",
      format: "cjs",
    },
    external,
  },
];
