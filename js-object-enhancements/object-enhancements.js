/* Write an ES2015 Version */

function createInstructor(firstName, lastName) {
    return {
        firstName, lastName
    }
}

let favoriteNumber = 42;
const instructor = {
    fistName: "Colt",
    [favoriteNumber]: "That is my favorite!"
}

let instructor2 = {
    firstName: "Colt",
    sayHi() {
        return "Hi!";
    },
    sayBye() {
        return this.firstName + "says bye!";
    }
}

function createAnimal(species, verb, noise){
    return {
        species,
        [verb](){return noise}
    }
}