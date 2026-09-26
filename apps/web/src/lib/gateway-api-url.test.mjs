import { test } from "node:test";
import { strict as assert } from "node:assert";
import { readGatewayApiUrl } from "./gateway-api-url.ts";

test("runtime gateway URL comes from inert meta data, not an inline script", () => {
  let selector;
  const root = {
    querySelector(value) {
      selector = value;
      return {
        getAttribute: (name) =>
          name === "content" ? "https://gateway.example.com" : null,
      };
    },
  };

  assert.equal(
    readGatewayApiUrl("http://localhost:10255", root),
    "https://gateway.example.com",
  );
  assert.equal(selector, 'meta[name="agentvault-gateway-api-url"]');
});

test("gateway URL falls back when no runtime meta tag exists", () => {
  assert.equal(
    readGatewayApiUrl("http://localhost:10255"),
    "http://localhost:10255",
  );
  assert.equal(
    readGatewayApiUrl("http://localhost:10255", { querySelector: () => null }),
    "http://localhost:10255",
  );
});
