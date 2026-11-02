import express from "express";

const app = express();

const userData = [
    {
        id: 101,
        name: "Abc",
        email: "cm@abes.call.in"
    }
];
app.get("/msg", (req, res) => {
    res.status(200).json({ message: "Hello from Express!" });
});
app.get("/user", (req, res) => {
    res.status(200).json(userData);
});
app.post("/create", (req, res) => {
    const newUser = req.body;

    userData.push(newUser);
    res.status(201).json({
        message: "User created successfully",
        user: newUser       
    });
});

app.put("/edit/:id", (req, res) => {
    const id = req.params.id;
    const index = userData.findIndex(user => user.id === id);
    if (index !== -1) {
        userData[index] = { ...userData[index], ...req.body };
        res.status(200).json({
            message: "User updated successfully",
            updatedUser: userData[index]
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});
app.delete("/user", (req, res) => {
    res.status(200).json(userData);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});