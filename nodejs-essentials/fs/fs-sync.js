const fs = require("fs");

const text = fs.readFileSync("./hello.txt", "utf-8");
console.log(text);
console.log("You will see this text after the file content is printed.");
console.log("This is the blocking approach.");