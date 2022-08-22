const request = require("request");

const getAsync = (url, options) => new Promise((resolve, reject) => {
    request.get(url, options, (err, data) => {
        if (err) {
            return reject(err);
        }
        resolve(data);
    })
})

getAsync("https://jsonplaceholder.typicode.com/posts/5")
    .then(({ body }) => {
        console.log(`Fetched Post:\n${body}`)
    })
    .catch(console.error);