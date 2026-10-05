const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  

  users.push({ name, email, password });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.send("User registered successfully");
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send("Login successful");
  } else {
    res.send("User not found! Signup first"); 
  }
};

module.exports = { registerUser, loginUser };



