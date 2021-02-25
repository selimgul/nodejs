const Person = require("./person");

class User extends Person {

    constructor(name, id) {
        super(name);
        this.id = id;
    };

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    greet() {
        console.log(`Name: ${this.name}, ID: ${this.id}`);
    }

    static hello(name) {
        console.log("Hi " + name);
    }
}

module.exports = User;

// const {User, Person} = require('./my_models/user');

// let person = new Person('Selim');
// let user = new User('Selim', 1);

// person.greet();
// user.greet();