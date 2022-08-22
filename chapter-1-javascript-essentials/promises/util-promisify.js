const request = require("request");
const util = require("util");
const getAsync = util.promisify(request.get);

getAsync("https://jsonplaceholder.typicode.com/posts/5")
    .then(({ body }) => {
        console.log(`Fetched Post:\n${body}`)
    })
    .catch(console.error);