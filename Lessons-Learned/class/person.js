class Person {

    constructor(name) {
        this.name = name;
    };

    greet() {
        console.log(`Name: ${this.name}`);
    }
}

module.exports = Person;