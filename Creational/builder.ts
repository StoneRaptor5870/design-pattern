/*
The Builder pattern separates the construction of a complex object from its representation
so that the same construction process can create different representations.

What it does:
Separates the construction of a complex object from its representation, so that the same construction
process can create different representations.

When to use:
When the creation of an object involves many steps or optional parameters.
When you want to avoid having a constructor with too many parameters (i.e. the telescoping constructor anti-pattern).
When the object construction process should be more readable and manageable.

How it works:
Create a Builder class that provides methods for setting each property.
A Director may optionally orchestrate the building steps.
The Builder returns the final complex object.

Pros:
Provides a flexible way to construct complex objects step by step.
Keeps the object construction code isolated from the client.

Cons:
Can become overly complex if the product has too many features or attributes.

Real-World Example:
Building a complex object like a meal with various courses (starter, main dish, dessert),
where you can customize the meal's components.
*/

class Car {
    constructor(public engine: string, public wheels: number, public colour: string) { }

    display(): void {
        console.log(`Car with ${this.engine} engine, ${this.wheels} wheels, and ${this.colour} colour`);
    }
}

class CarBuilder {
    private engine: string = "";
    private wheels: number = 0;
    private colour: string = "";

    setEngine(engine: string): CarBuilder {
        this.engine = engine;
        return this;
    }

    setWheels(wheels: number): CarBuilder {
        this.wheels = wheels;
        return this;
    }

    setColor(colour: string): CarBuilder {
        this.colour = colour;
        return this;
    }

    build(): Car {
        return new Car(this.engine, this.wheels, this.colour);
    }
}

const car: Car = new CarBuilder()
    .setEngine("v12")
    .setWheels(4)
    .setColor("Red")
    .build()

car.display(); // Car with V12 engine, 4 wheels, and Red colour