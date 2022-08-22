const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let initialValue = 0;

const sum = array.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
}, initialValue);

console.log(`Sum of the all digits: ${sum}`);