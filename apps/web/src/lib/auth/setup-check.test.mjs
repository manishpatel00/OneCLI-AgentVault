import { test } from "node:test";
import { strict as assert } from "node:assert";
import { checkAuthSetup } from "./setup-check.ts";

const valid = {
  isCloud: false,
  nextAuthSecret: "secret",
  googleClientId: "id",
  googleClientSecret: "client-secret",
  encryptionKey: "key",
};

test("local and fully configured OAuth modes are accepted", () => {
  assert.equal(checkAuthSetup(valid), null);
  assert.equal(
    checkAuthSetup({
      ...valid,
      nextAuthSecret: "",
      googleClientId: "",
      googleClientSecret: "",
    }),
    null,
  );
});

test("partial OAuth configuration fails closed rather than enabling local mode", () => {
  for (const field of [
    "nextAuthSecret",
    "googleClientId",
    "googleClientSecret",
  ]) {
    assert.equal(
      checkAuthSetup({ ...valid, [field]: "" }),
      "oauth-misconfigured",
    );
  }
  assert.equal(
    checkAuthSetup({ ...valid, nextAuthSecret: "", googleClientSecret: "" }),
    "oauth-misconfigured",
  );
});

test("missing encryption key is rejected outside cloud", () => {
  assert.equal(
    checkAuthSetup({ ...valid, encryptionKey: "" }),
    "missing-encryption-key",
  );
  assert.equal(
    checkAuthSetup({ ...valid, isCloud: true, encryptionKey: "" }),
    null,
  );
});
