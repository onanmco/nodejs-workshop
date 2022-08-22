const fullName = "Mustafa Cem Onan";

const pattern = new RegExp("^(?<firstName>.*)\\b (?<lastName>[^ ]+)$");

const { firstName, lastName } = fullName.match(pattern).groups;

console.log("My first name is " + firstName);
console.log("My last name is " + lastName);