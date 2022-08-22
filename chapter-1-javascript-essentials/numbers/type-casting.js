const examples = [
    "20px",
    "5e1",
    "2022-08-22",
    new Date("2022-08-22"),
    "10.234",
    true,
    false,
    "",
    undefined,
    "   10  "
];

const a = 10;
a.toFixed()

const comparisonTable = examples.reduce((acc, item) => {
    acc[item] = {
        Number: Number(item),
        parseInt: parseInt(item),
        parseFloat: parseFloat(item)
    };
    return acc;
}, {});

console.table(comparisonTable);