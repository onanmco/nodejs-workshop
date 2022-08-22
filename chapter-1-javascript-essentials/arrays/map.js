const digits = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

const digitsDoubledByTwo = digits.map((digit, index, array) => {
    return digit * 2;
})

console.log(digitsDoubledByTwo);