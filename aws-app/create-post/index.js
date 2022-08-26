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
const yup = require("yup");

const schema = yup.object({
    title: yup.string()
        .required(),
    body: yup.string()
        .required()
});

exports.handler = async (event, context) => {
    console.log(JSON.stringify(event));

    const body = JSON.parse(event.body);

    try {
        schema.validateSync(body, { abortEarly: false });
    } catch ({ errors }) {
        console.error(errors);
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Validation Error",
                details: errors
            })
        };
    }

    const { title, body: postBody } = body;

    const {
        pathParameters: {
            user_id
        }
    } = event;

    const [ savedPost ] = await connection("post")
        .insert({
            title,
            body: postBody,
            user_id
        })
        .returning("*");

    return {
        statusCode: 201,
        body: JSON.stringify({
            data: savedPost
        })
    };
};