const connection = require("knex").knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PWD, 
    },
    pool: {
        min: 0,
        max: 1
    },
    acquireConnectionTimeout: 30000
});

exports.handler = async (event, context) => {
    console.log(JSON.stringify(event));

    const {
        pathParameters: {
            user_id
        }
    } = event;

    const existingUser = await connection.select("*")
        .from("user")
        .where({ id: user_id })
        .first();

    if (!existingUser) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "User not found."
            })
        };
    }

    const posts = await connection.select("*")
        .from("post")
        .where({ user_id });

    return {
        statusCode: 201,
        body: JSON.stringify({
            data: posts
        })
    };
};