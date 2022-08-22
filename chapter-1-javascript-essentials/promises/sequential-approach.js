const request = require("request");
const util = require("util");
const getAsync = util.promisify(request.get);

async function main() {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const start = Date.now();
    const allPosts = [];
    for (let i = 0; i < ids.length; i++) {
        console.log(`Fetching ${i + 1}. post.`);
        allPosts.push(await getAsync(`https://jsonplaceholder.typicode.com/posts/${ids[i]}`));
    }
    console.log(`Elapsed time: ${((Date.now() - start) / 1000).toFixed(2)} seconds`);
    // console.log("All posts", allPosts);
}

main();