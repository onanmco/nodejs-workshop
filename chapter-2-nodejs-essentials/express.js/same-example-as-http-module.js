const express = require("express");
const app = express();
const port = 3000;

app.use((request, response, next) => {
    console.log(`${new Date().toISOString()}: ${request.method} ${request.url}`);
    next();
});

app.post("/hello", express.json(), (request, response) => {
    const { name } = request.body;
    if (!name) {
        return response.status(400)
            .send("name is a required parameter.");
    }
    response.status(200)
        .send(`Hello ${name}!`);
});

app.use((request, response) => {
    response.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});