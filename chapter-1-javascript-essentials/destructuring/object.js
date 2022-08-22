const person = {
    name: "Cem",
    age: 27,
    hobbies: [
        "Playing Guitar",
        "Photography"
    ]
};

const { name: firstName, age } = person;

console.log(firstName);
console.log(age);