const person = {
    name: "Cem",
    age: 27,
    hobbies: [
        "Playing Guitar",
        "Photography"
    ],
    languages: [
        {
            name: "English",
            level: "Intermediate"
        },
        {
            name: "Turkish",
            level: "Native"
        }
    ]
};

const {
    name: firstName,
    languages: [
        {
            name,
            level
        }
    ]
} = person;

console.log(`${firstName}\s ${name} level is ${level}.`);