const http = require("http");

const port = 3000;

http.createServer((request, response) => {
    response.setHeader("Content-Type", "text/plain");
    response.setHeader("Accept", "application/json");
    console.log(`${new Date().toISOString()}: ${request.method} ${request.url}`);
    switch (request.method) {
        case "POST":
            switch (request.url) {
                case "/hello":
                    try {
                        const chunks = [];
                        request.on("data", (chunk) => {
                            chunks.push(chunk);
                        });
                        request.on("end", () => {
                            const body = Buffer.concat(chunks)
                                .toString("utf-8");
                            const { name } = JSON.parse(body);
                            if (! name) {
                                response.statusCode = 400;
                                return response.end(`name is a required parameter.`);
                            }
                            response.statusCode = 200;
                            response.end(`Hello ${name}!`);
                        });
                    } catch (e) {
                        console.error(e);
                        response.statusCode = 500;
                        response.end();
                        break;
                    }
                    break;
                default:
                    response.statusCode = 404;
                    response.end();
                    break;
            }
            break;
        default:
            response.statusCode = 404;
            response.end();
            break;
    }
}).listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});