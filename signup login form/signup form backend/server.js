import express from "express";
import cors from "cors";
import {
  authenticateUser,
  createUser,
  DuplicateEmailError,
} from "./userStore.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.trim().length > 100 ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    email.trim().length > 254 ||
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 256
  ) {
    return res.status(400).json({
      message: "Enter a valid name, email, and password (at least 8 characters).",
    });
  }

  try {
    await createUser({ name, email, password });
    return res.status(201).json({ message: "Account created successfully." });
  } catch (error) {
    if (error instanceof DuplicateEmailError) {
      return res.status(409).json({ message: error.message });
    }
    return next(error);
  }
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body ?? {};

  if (
    typeof email !== "string" ||
    !email.trim() ||
    email.trim().length > 254 ||
    typeof password !== "string" ||
    !password ||
    password.length > 256
  ) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await authenticateUser({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    return res.json({ message: "Login successful.", user });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error("Request failed:", error);
  return res.status(500).json({ message: "The request could not be completed." });
});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
