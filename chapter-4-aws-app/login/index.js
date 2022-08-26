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
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const schema = yup.object({
    email: yup.string()
        .email()
        .required(),
    password: yup.string()
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

    let { email, password } = body;

    const existingUser = await connection.select("*")
        .from("user")
        .where({ email })
        .first();

    if (!existingUser || !bcrypt.compareSync(password, existingUser.password)) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Invalid credentials."
            })
        };
    }

    return {
        statusCode: 201,
        body: JSON.stringify({
            data: {
                jwt: sign({
                    user_id: existingUser.id,
                    email: existingUser.email
                }, SECRET_KEY)
            }
        })
    };
};