const name = "Cem";
const role = "developer";

const legacyString = "Hello.\nMy name is " + name + ".\nMy role is " + role + ".";

console.log(legacyString);

const templateLiteral = 
`Hello.
My name is ${name}
My role is ${role}.
`;

console.log(templateLiteral);