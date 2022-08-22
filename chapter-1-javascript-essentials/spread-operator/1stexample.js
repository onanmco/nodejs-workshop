const request = require("request");

const options = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
        ...options,
        body: JSON.stringify({
            title: "Hello world!",
            body: "Quick brown fox jumps over the lazy dog."
        })
    },
    (err, data) => {
        if (err) {
            throw err;
        }
        console.log(JSON.parse(data.body));
    }
);