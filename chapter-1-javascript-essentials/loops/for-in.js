const person = {
    name: "Cem",
    age: 27,
    hobbies: [
        "Playing Guitar",
        "Photography"
    ]
};

for (let key in person) {
    console.log(`Key: ${key}`);
    console.log(`Value: ${person[key]}`);
}