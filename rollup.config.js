export default {
  input: "index.js",
  output: {
    file: "index.cjs",
    format: "cjs",
  },
  external: ["fs", "os", "which"],
};
