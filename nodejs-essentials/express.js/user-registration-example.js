const express = require("express");
const yup = require("yup");
const bcrypt = require("bcryptjs");
const connection = require("knex").knex({
    client: "sqlite3",
    connection: {
        filename: "./db.sqlite"
    },
    useNullAsDefault: true
});
const app = express();
const port = 3000;
const { sign } = require("jsonwebtoken");
const SECRET_KEY = "SUPERSECRET";

app.use(express.json());

app.post("/register", async (req, res) => {
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

    try {
        schema.validateSync(req.body, { abortEarly: false })
    } catch ({ errors: details }) {
        return res.status(400)
            .json({
                message: "Validation Error",
                details
            });
    }

    let { firstName: first_name, lastName: last_name, email, password } = req.body;

    const existingUser = await connection.select("*")
        .from("user")
        .where({ email })
        .first();

    if (existingUser) {
        return res.status(400)
            .json({
                message: `${email} has already taken.`
            });
    }

    password = bcrypt.hashSync(password, 10);

    await connection("user")
        .insert({
            first_name,
            last_name,
            email,
            password
        });

    const { id, ...savedUser } = await connection.raw(
        `
        select *
        from user
        where email = ?
        `,
        [ email ]
    );
    
    savedUser.jwt = sign({
        user_id: id,
        email: savedUser.email
    }, SECRET_KEY);

    return res.status(201)
        .json({
            data: savedUser
        })
});

app.post("/login", async (req, res) => {
    const schema = yup.object({
        email: yup.string()
            .email()
            .required(),
        password: yup.string()
            .required()
    });

    try {
        schema.validateSync(req.body, { abortEarly: false })
    } catch ({ errors: details }) {
        return res.status(400)
            .json({
                message: "Validation Error",
                details
            });
    }

    const { email, password } = req.body;

    const existingUser = await connection.select("*")
        .from("user")
        .where({ email })
        .first();

    if (!existingUser) {
        return res.status(400)
            .json({
                message: `User with email ${email} not found.`
            });
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
        return res.status(401)
            .json({
                message: "Invalid credentials."
            });
    }

    return res.status(200)
        .json({
            data: {
                jwt: sign({
                    user_id: existingUser.id,
                    email: existingUser.email
                }, SECRET_KEY)
            }
        })
});

app.use((request, response) => {
    response.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})