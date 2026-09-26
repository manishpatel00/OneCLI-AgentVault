import { test } from "node:test";
import { strict as assert } from "node:assert";
import { syncLoginSession } from "./login-session.ts";

test("sync returns the user's default project when available", async () => {
  assert.deepEqual(
    await syncLoginSession(async () =>
      Response.json({ projectId: "project-1" }),
    ),
    { status: "ok", projectId: "project-1" },
  );
  assert.deepEqual(
    await syncLoginSession(async () =>
      Response.json({ email: "a@example.com" }),
    ),
    { status: "ok", projectId: undefined },
  );
});

test("sync distinguishes expired sessions from retryable errors", async () => {
  assert.deepEqual(
    await syncLoginSession(async () => Response.json({}, { status: 401 })),
    { status: "unauthorized" },
  );
  assert.deepEqual(
    await syncLoginSession(async () =>
      Response.json({ error: "Database unavailable" }, { status: 503 }),
    ),
    { status: "error", message: "Database unavailable" },
  );
  assert.deepEqual(
    await syncLoginSession(async () =>
      Response.json({ error: "Account conflict" }, { status: 409 }),
    ),
    { status: "conflict", message: "Account conflict" },
  );
  assert.equal(
    (await syncLoginSession(async () => new Response("oops", { status: 500 })))
      .status,
    "error",
  );
  assert.deepEqual(
    await syncLoginSession(async () => {
      throw new Error("offline");
    }),
    {
      status: "error",
      message:
        "Failed to communicate with the server. Please check your network.",
    },
  );
});
