import fs from 'node:fs/promises';

const filepath = "Data.js";

async function createfile(content) {
    try {
        await fs.writeFile(filepath, content, "utf8");
        console.log("File created successfully");
    } catch (err) {
        console.error("Error creating file:", err);
    }
}

async function readfile() {
    try {
        const data = await fs.readFile(filepath, "utf8");
        console.log("File content:", data);
        return data;
    } catch (err) {
        if (err.code === "ENOENT") {
            console.error("File not found:", err);
        } else {
            console.error("Error reading file:", err);
        }
    }
}

async function updatefile(additionalContent) {
    try {
        const currentContent = await fs.readFile(filepath, "utf8");
        await fs.writeFile(
            filepath,
            currentContent + additionalContent,
            "utf8"
        );
        console.log("File updated successfully");
    } catch (err) {
        console.error("Error updating file:", err);
    }
}

async function deletefile() {
    try {
        await fs.unlink(filepath);
        console.log("File deleted successfully");
    } catch (err) {
        console.error("Error deleting file:", err);
    }
}

await createfile("Hello, this is a sample file content.");
await readfile();
await updatefile("\nThis is additional content added to the file.");
await deletefile();