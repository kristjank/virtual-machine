// person.js
'use strict';

module.exports = class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    display() {
        console.log(this.firstName + " " + this.lastName);
    }


    setAge(age) {
        this.age = age;
    }
}
