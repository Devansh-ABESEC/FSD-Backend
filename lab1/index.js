import {EventEmitter} from "node:events";
const eventEmitter = new EventEmitter();

// Register Listener
eventEmitter.on("greet", (name) => {
    console.log(`Hello, ${name}! Welcome to the session.`);
});

eventEmitter.on("exit", (reason) => {
    console.log(`Session ending. Reason: ${reason}`);
});

eventEmitter.on("greet", () => {
    console.log("Class started by Devansh singh");
});

eventEmitter.on("exit", () => {
    console.log("Class ended by Devansh singh");
});

// Emit events
eventEmitter.emit("greet", "Students");
eventEmitter.emit("exit", "Class time over");