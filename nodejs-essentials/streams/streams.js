const fs = require("fs");
const readStream = fs.createReadStream("./text.txt", { highWaterMark: 1024 });
const writeStream = fs.createWriteStream("./text-copy.txt", { highWaterMark: 16 });

readStream.on("data", (buffer) => {
    if (!writeStream.write(buffer)) {
        console.log("Internal buffer is full. Pause reading.");
        readStream.pause();
    }
});

writeStream.on("drain", () => {
    console.log("Buffer is now available. Resume reading.");
    readStream.resume();
});