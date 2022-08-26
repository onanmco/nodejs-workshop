const fs = require("fs");

let fullText = "";
const stream = fs.createReadStream("./lorem.txt", { highWaterMark: 64 });

stream.on("data", (buffer) => {
    let dataAsString = buffer.toString("utf-8");
    console.log(`Current chunk: ${dataAsString}`);
    fullText += dataAsString;
});

stream.on("end", () => {
   console.log(`Full text: ${fullText}`); 
});