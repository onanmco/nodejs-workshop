const person = {
    name: "Cem",
    age: 27,
    hobbies: [
        "Playing Guitar",
        "Photography"
    ]
};

const personObjectAsString = JSON.stringify(person);

console.log(person);
console.log(personObjectAsString);
console.log(JSON.parse(personObjectAsString));