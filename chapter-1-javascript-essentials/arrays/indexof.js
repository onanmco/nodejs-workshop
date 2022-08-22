const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const isEven = value => value % 2 == 0;

console.log(
`Index of 5: ${digits.indexOf(5)}
Is 5 included in array? ${digits.includes(5)}
Is there at least one even number? ${digits.some(isEven)}
Is every number even? ${digits.every(isEven)}`
);