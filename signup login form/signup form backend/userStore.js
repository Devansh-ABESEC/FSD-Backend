import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scryptAsync = promisify(scrypt);
const defaultStorePath = process.env.USER_STORE_PATH
  ? resolve(process.env.USER_STORE_PATH)
  : join(dirname(fileURLToPath(import.meta.url)), "data", "users.json");
const writeQueues = new Map();

export class DuplicateEmailError extends Error {
  constructor() {
    super("An account with this email already exists.");
    this.name = "DuplicateEmailError";
  }
}

async function readUsers(storePath) {
  try {
    const contents = await readFile(storePath, "utf8");
    const users = JSON.parse(contents);
    if (!Array.isArray(users)) {
      throw new Error("User store must contain a JSON array.");
    }
    return users;
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeUsers(storePath, users) {
  await mkdir(dirname(storePath), { recursive: true });
  const temporaryPath = `${storePath}.${randomBytes(8).toString("hex")}.tmp`;
  try {
    await writeFile(temporaryPath, JSON.stringify(users, null, 2), {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });
    await rename(temporaryPath, storePath);
  } catch (error) {
    try {
      await unlink(temporaryPath);
    } catch (cleanupError) {
      if (cleanupError.code !== "ENOENT") {
        throw cleanupError;
      }
    }
    throw error;
  }
}

function serializeWrites(storePath, operation) {
  const previousWrite = writeQueues.get(storePath) ?? Promise.resolve();
  const currentWrite = previousWrite.then(operation);
  writeQueues.set(
    storePath,
    currentWrite.then(
      () => undefined,
      () => undefined,
    ),
  );
  return currentWrite;
}

export async function createUser({ name, email, password }, storePath = defaultStorePath) {
  const normalizedEmail = email.trim().toLowerCase();
  const salt = randomBytes(16);
  const passwordHash = await scryptAsync(password, salt, 64);
  const user = {
    name: name.trim(),
    email: normalizedEmail,
    salt: salt.toString("hex"),
    passwordHash: passwordHash.toString("hex"),
    createdAt: new Date().toISOString(),
  };

  return serializeWrites(storePath, async () => {
    const users = await readUsers(storePath);
    if (users.some((existingUser) => existingUser.email === normalizedEmail)) {
      throw new DuplicateEmailError();
    }
    await writeUsers(storePath, [...users, user]);
  });
}

export async function authenticateUser({ email, password }, storePath = defaultStorePath) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = await readUsers(storePath);
  const user = users.find((candidate) => candidate.email === normalizedEmail);
  if (!user) {
    return null;
  }

  const salt = Buffer.from(user.salt, "hex");
  const storedHash = Buffer.from(user.passwordHash, "hex");
  if (salt.length !== 16 || storedHash.length !== 64) {
    throw new Error("Stored account credentials are invalid.");
  }

  const passwordHash = await scryptAsync(password, salt, storedHash.length);
  if (!timingSafeEqual(storedHash, passwordHash)) {
    return null;
  }

  return { name: user.name, email: user.email };
}
