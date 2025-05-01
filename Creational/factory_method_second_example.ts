interface Vehicle {
    brand: string;
    model: string;
    getInfo(): string;
}

class CarFM implements Vehicle {
    brand: string;
    model: string;
    doors: number;

    constructor(brand: string, model: string, doors: number) {
        this.brand = brand;
        this.model = model;
        this.doors = doors;
    }

    getInfo(): string {
        return `${this.brand} ${this.model}, ${this.doors} doors car`;
    }
}

class Motorcycle implements Vehicle {
    brand: string;
    model: string;
    hasABS: boolean;

    constructor(brand: string, model: string, hasABS: boolean) {
        this.brand = brand;
        this.model = model;
        this.hasABS = hasABS;
    }

    getInfo(): string {
        return `${this.brand} ${this.model}, motorcycle with${this.hasABS ? '' : 'out'} ABS`;
    }
}

// Factory
type VehicleType = 'car' | 'motorcycle';
type VehicleOption = number | boolean;

class VehicleFactory2 {
    createVehicle(type: VehicleType, brand: string, model: string, option: VehicleOption): Vehicle {
        switch (type) {
            case 'car':
                return new CarFM(brand, model, option as number);
            case 'motorcycle':
                return new Motorcycle(brand, model, option as boolean);
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