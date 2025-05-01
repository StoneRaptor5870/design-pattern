"use strict";
class CarFM {
    constructor(brand, model, doors) {
        this.brand = brand;
        this.model = model;
        this.doors = doors;
    }
    getInfo() {
        return `${this.brand} ${this.model}, ${this.doors} doors car`;
    }
}
class Motorcycle {
    constructor(brand, model, hasABS) {
        this.brand = brand;
        this.model = model;
        this.hasABS = hasABS;
    }
    getInfo() {
        return `${this.brand} ${this.model}, motorcycle with${this.hasABS ? '' : 'out'} ABS`;
    }
}
class VehicleFactory2 {
    createVehicle(type, brand, model, option) {
        switch (type) {
            case 'car':
                return new CarFM(brand, model, option);
            case 'motorcycle':
                return new Motorcycle(brand, model, option);
            default:
                throw new Error(`Vehicle type ${type} not supported.`);
        }
    }
}
// Usage
const factory2 = new VehicleFactory2();
const toyota = factory2.createVehicle('car', 'Toyota', 'Corolla', 4);
const honda = factory2.createVehicle('motorcycle', 'Honda', 'CBR', true);
console.log(toyota.getInfo()); // Toyota Corolla, 4 doors car
console.log(honda.getInfo()); // Honda CBR, motorcycle with ABS
