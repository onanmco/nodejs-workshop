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
    firstName: yup.string()
        .min(2)
        .max(255)
        .required(),
    lastName: yup.string()
        .min(2)
        .max(255)
        .required(),
    email: yup.string()
        .email()
        .required(),
    password: yup.string()
        .min(8)
        .max(16)
        .matches(/\d/, "password should contain at least 1 digit.")
        .matches(/[A-Z]/, "password should contain at least 1 uppercase letter.")
        .matches(/[a-z]/, "password should containt at least 1 letter.")
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

    let { firstName: first_name, lastName: last_name, email, password } = body;

    const existingUser = await connection.select("*")
        .from("user")
        .where({ email })
        .first();

    if (existingUser) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Validation Error",
                details: `E-mail ${email} has already taken.`
            })
        };
    }

    password = bcrypt.hashSync(password, 10);

    const [ savedUser ] = await connection("user")
        .insert({
            first_name,
            last_name,
            email,
            password
        })
        .returning("*");
    
    savedUser.jwt = sign({
        user_id: id,
        email: savedUser.email
    }, SECRET_KEY);

    return {
        statusCode: 201,
        body: JSON.stringify({
            data: savedUser
        })
    };
};