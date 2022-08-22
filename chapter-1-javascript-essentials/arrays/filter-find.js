const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const isEven = value => value % 2 == 0;

const evenDigits = digits.filter(isEven);
const firstEvenDigit = digits.find(isEven);

console.log(JSON.stringify({ evenDigits }));
console.log(JSON.stringify({ firstEvenDigit }));
