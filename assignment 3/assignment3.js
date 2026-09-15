import http from "http";

const userData = [{
    id: 101,
    name: "Abc",
    email: "cm@abes.call.in"
}];

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url == "/msg" && method == "GET") {
        res.end("This is welcome message from server");
    }

    else if (url == "/sys" && method == "GET") {
        res.end("This is system information");
    }

    else if (url == "/data" && method == "GET") {
        res.end(JSON.stringify(userData));
    }

    else if (url == "/create" && method == "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            const newData = JSON.parse(body);

            const newUserData = {
                id: newData.id,
                name: newData.name,
                email: newData.email
            };

            userData.push(newUserData);

            res.end("User Created Successfully");
        });
    }

    else if (url == "/users" && method == "GET") {
        res.end(JSON.stringify(userData));
    }

    // Get user by ID
    else if (url.startsWith("/users/") && method == "GET") {

        const id = url.split("/")[2];

        const user = userData.find((u) => u.id == id);

        if (!user) {
            return res.end("User Not Found");
        }

        res.end(JSON.stringify(user));
    }

    // Update email by ID
    else if (url.startsWith("/users/") && method == "PUT") {

        const id = url.split("/")[2];

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            const data = JSON.parse(body);

            const user = userData.find((u) => u.id == id);

            if (!user) {
                return res.end("User Not Found");
            }

            user.email = data.email;

            res.end(JSON.stringify(user));
        });
    }

});

server.listen(4000, () => {
    console.log("Server is running on port number 4000");
});