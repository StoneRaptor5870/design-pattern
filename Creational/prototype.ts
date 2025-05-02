/**
 * The Prototype pattern is used to create duplicate objects while keeping performance in mind.
 * It involves creating a copy of an existing object rather than creating new ones.
 * 
 * What it does:
 * Allows you to clone existing objects without depending on their concrete classes
 * effectively creating new objects by copying a prototype.
 * 
 * When to use:
 * When object creation is expensive (e.g., large data or computation-heavy objects).
 * When creating new instances is frequent and configuration is complex.
 * When you want to keep creation logic in the object itself.
 * 
 * How it works:
 * Define a clone() method in your base class or interface.
 * Objects can then be copied/cloned without using new.
 * 
 * Pros:
 * Efficient when creating new objects that are identical to an existing object.
 * Reduces the need to create new objects from scratch.
 *
 * Cons:
 * Can be difficult to manage if the cloned objects have complex states.
 *
 * Real-World Example:
 * In graphical design software, objects like shapes (circle, rectangle, etc.) can be cloned to create
 * identical or modified versions without creating them from scratch every time.
 */

class CarP {
    constructor(public engine: string, public wheels: number, public colour: string) {
        this.engine = engine;
        this.wheels = wheels;
        this.colour = colour;
    }

    clone(): CarP {
        return new CarP(this.engine, this.wheels, this.colour)
    }

    display(): void {
        console.log(`Car with ${this.engine} engine, ${this.wheels} wheels, and ${this.colour} colour`);
    }
}

const car1: CarP = new CarP("V8",4,"Red");
const car2: CarP = car1.clone();
car2.display(); // Car with V8 engine, 4 wheels, and Red colour
car2.engine = "V12";
car2.colour = "Yellow";
car2.display(); // Car with V12 engine, 4 wheels, and Yellow colour