/**
 * @overview Check if the version of runtime dependencies being depended upon
 * match the minimum version of the supported versions.
 * @license MIT
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { common } from "./_.js";

const manifestPath = path.resolve(common.projectRoot, "package.json");
const rawManifest = fs.readFileSync(manifestPath).toString();
const manifest = JSON.parse(rawManifest);
const runtimeDeps = manifest.dependencies;

const violations = Object.entries(runtimeDeps)
  .map(([dependency, supported]) => ({
    dependency,
    installed: getInstalledVersion(dependency),
    supported,
  }))
  .filter(({ installed, supported }) => !supported.endsWith(installed));

if (violations.length > 0) {
  violations.forEach(({ dependency, installed, supported }) => {
    console.log("Dependency:", dependency);
    console.log("  supported:", supported);
    console.log("  installed:", installed);
  });

  console.log("");
  console.log(
    violations.length,
    "violation(s) found.",
    "Update either the version range or installed version of each violation.",
  );

  process.exit(1);
} else {
  console.log("No problems detected");
}

// -----------------------------------------------------------------------------

function getInstalledVersion(dependency) {
  const { stdout } = common.npmSync([
    "ls",
    // Get a parsable output
    "--json",
    // Only look at direct dependencies
    "--depth",
    "0",
    // The dependency to get
    dependency,
  ]);

  const dependenciesInfo = JSON.parse(stdout);
  const installed = dependenciesInfo.dependencies[dependency].version;
  return installed;
}
