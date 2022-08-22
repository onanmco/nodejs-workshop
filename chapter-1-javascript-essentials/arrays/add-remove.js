const array = [1, 2, 3];

console.log("Array", array);

array.push(4);
console.log("After pushing 4 at the end of the array", array);

array.pop();
console.log("After removing the last element from the array", array);

array.shift();
console.log("After removing the first element from the array", array);

array.unshift(1);
console.log("After adding 1 to the beginning of the array", array);