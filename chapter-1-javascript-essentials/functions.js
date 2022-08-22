this.name = "Cem";

const person1 = {
    name: "Mustafa Cem",
    greeting: function() {
        console.log("Hello " + this.name + ".")
    }
};

const person2 = {
    name: "Mustafa Cem",
    greeting: () => {
        console.log("Hello " + this.name + ".")
    }
};

person1.greeting();
person2.greeting();