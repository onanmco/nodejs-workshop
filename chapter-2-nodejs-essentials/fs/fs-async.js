const fs = require("fs");

fs.readFile("./hello.txt", (err, data) => {
    if (err) {
        throw err;
    }
    console.log("This is the non-blocking approach.");
    console.log(data.toString("utf-8"));
});

console.log("You will see this text before the file content is printed.");