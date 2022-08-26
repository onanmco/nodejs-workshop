const axios = require("axios");

axios.get("https://jsonplaceholder.typicode.com/todos/1")
    .then(({ data: response }) => console.log(response))
    .catch(console.error);