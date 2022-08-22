const dateTimeString = "2022-08-22T11:00:00";

const array = dateTimeString.split("T");

console.log(array);

const date = array[0];
const time = array[1];

console.log("Date " + date);
console.log("Time " + time);