const assert = require("node:assert/strict");
const test = require("node:test");

test("Vercel builds expose production data configuration to the client", () => {
  const previousProd = process.env.PROD;
  const previousVercel = process.env.VERCEL;

  delete process.env.PROD;
  process.env.VERCEL = "1";
  delete require.cache[require.resolve("../next.config.js")];

  try {
    const config = require("../next.config.js");
    assert.equal(config.env.PROD, "True");
  } finally {
    if (previousProd === undefined) delete process.env.PROD;
    else process.env.PROD = previousProd;

    if (previousVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = previousVercel;
  }
});
