/**
 * @overview Check that all possible ESLint rules are explicitly configured at
 * least once.
 * @license MIT-0
 */

import console from "node:console";
import process from "node:process";

const configModule = await import("../config/eslint.js");
const configArray = configModule.default;

const all = new Set();
const configured = new Set();
const links = new Map();

for (const config of configArray) {
  for (const pluginName in config.plugins) {
    const plugin = config.plugins[pluginName];
    for (const ruleName in plugin.rules) {
      const rule = plugin.rules[ruleName];
      if (rule?.meta?.deprecated) {
        continue;
      }

      const ruleId = pluginName ? `${pluginName}/${ruleName}` : ruleName;
      all.add(ruleId);

      const documentation = rule?.meta?.docs?.url;
      if (documentation) {
        links.set(ruleId, documentation);
      }
    }
  }

  for (const ruleId in config.rules) {
    configured.add(ruleId);
  }
}

const unconfigured = all.difference(configured);
if (unconfigured.size > 0) {
  for (const rule of unconfigured) {
    const text = `'${rule}'`;
    const link = links.has(rule) ? `(<${links.get(rule)}>)` : "";
    console.log(`${text} ${link}`);
  }
  console.log("");
  console.log(
    unconfigured.size,
    "missing rule(s) found.",
    "Explicitly configure each of them.",
  );

  process.exit(1);
}

const overconfigured = configured
  .difference(all)
  .keys()
  .filter((rule) => rule.includes("/"))
  .toArray();
if (overconfigured.length > 0) {
  for (const rule of overconfigured) {
    console.log(`'${rule}'`);
  }
  console.log("");
  console.log(
    overconfigured.length,
    "rule(s) configured but not found.",
    "Remove each of them.",
  );

  process.exit(1);
}

console.log("No problems detected");
