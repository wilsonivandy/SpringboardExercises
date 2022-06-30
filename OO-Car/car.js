class Vehicle {
    constructor(make, model, year){        
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk() {
        return "Beep";
    }

    toString(){
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
    }
    numWheels() {
        return 4;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
    }
    revEngine() {
        return "VROOM!!!";
    }
    numWheels(){
        return 2;
    }
}

class Garage {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }
    add(c){
        if ((c instanceof Vehicle) && (this.vehicles.length < this.capacity)){
            this.vehicles.push(c);
            return "Vehicle added!";
        } else if (c instanceof Vehicle) {
            return "Sorry, we're full";
        } else {
            return "Only Vehicles are allowed in here!";
        }
    }
}