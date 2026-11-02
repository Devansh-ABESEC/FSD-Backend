import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, test } from "node:test";
import {
  authenticateUser,
  createUser,
  DuplicateEmailError,
} from "./userStore.js";

let storeDirectory;
let storePath;

before(async () => {
  storeDirectory = await mkdtemp(join(tmpdir(), "signup-backend-test-"));
  storePath = join(storeDirectory, "users.json");
});

after(async () => {
  await rm(storeDirectory, { recursive: true, force: true });
});

test("signup persists a normalized account with a hashed password", async () => {
  await createUser({
    name: "Taylor User",
    email: "Taylor@Example.com ",
    password: "correct-horse",
  }, storePath);

  const savedUsers = JSON.parse(await readFile(storePath, "utf8"));
  assert.equal(savedUsers.length, 1);
  assert.equal(savedUsers[0].email, "taylor@example.com");
  assert.notEqual(savedUsers[0].passwordHash, "correct-horse");
  assert.deepEqual(
    await authenticateUser({
      email: "TAYLOR@example.com",
      password: "correct-horse",
    }, storePath),
    { name: "Taylor User", email: "taylor@example.com" },
  );
});

test("login rejects an incorrect password", async () => {
  assert.equal(
    await authenticateUser({
      email: "taylor@example.com",
      password: "not-the-password",
    }, storePath),
    null,
  );
});

test("signup prevents duplicate accounts even when requests overlap", async () => {
  const attempts = await Promise.allSettled([
    createUser({ name: "One", email: "duplicate@example.com", password: "password-one" }, storePath),
    createUser({ name: "Two", email: "DUPLICATE@example.com", password: "password-two" }, storePath),
  ]);

  assert.equal(attempts.filter((attempt) => attempt.status === "fulfilled").length, 1);
  const rejectedAttempt = attempts.find((attempt) => attempt.status === "rejected");
  assert.ok(rejectedAttempt.reason instanceof DuplicateEmailError);
});
