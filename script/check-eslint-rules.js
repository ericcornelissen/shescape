/**
 * @overview Check that all possible ESLint rules are explicitly configured at
 * least once.
 * @license MIT-0
 */

import process from "node:process";

const configModule = await import("../config/eslint.js");
const configArray = configModule.default;

const all = new Set();
const configured = new Set();

for (const config of configArray) {
  for (const pluginName in config.plugins) {
    const plugin = config.plugins[pluginName];
    for (const ruleName in plugin.rules) {
      const rule = plugin.rules[ruleName];
      if (!rule?.meta?.deprecated) {
        const ruleId = pluginName ? `${pluginName}/${ruleName}` : ruleName;
        all.add(ruleId);
      }
    }
  }

  for (const ruleId in config.rules) {
    configured.add(ruleId);
  }
}

const unconfigured = all.difference(configured);
if (unconfigured.size > 0) {
  console.log(`'${[...unconfigured].join("'\n'")}'`);
  console.log("");
  console.log(
    unconfigured.size,
    "missing rule(s) found.",
    "Explicitly configure each of them.",
  );

  process.exit(1);
} else {
  console.log("No problems detected");
}
