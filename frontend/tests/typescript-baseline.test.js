const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const path = require("node:path");
const test = require("node:test");

test("frontend TypeScript accepts Next fetch revalidation options", () => {
  const tsc = path.join(__dirname, "..", "node_modules", "typescript", "bin", "tsc");

  assert.doesNotThrow(() =>
    execFileSync(process.execPath, [tsc, "--noEmit"], { cwd: path.join(__dirname, "..") })
  );
});
