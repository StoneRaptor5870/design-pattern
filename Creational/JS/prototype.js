"use strict";
/**
 * The Prototype pattern is used to create duplicate objects while keeping performance in mind.
 * It involves creating a copy of an existing object rather than creating new ones.
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
    constructor(engine, wheels, colour) {
        this.engine = engine;
        this.wheels = wheels;
        this.colour = colour;
        this.engine = engine;
        this.wheels = wheels;
        this.colour = colour;
    }
    clone() {
        return new CarP(this.engine, this.wheels, this.colour);
    }
    display() {
        console.log(`Car with ${this.engine} engine, ${this.wheels} wheels, and ${this.colour} colour`);
    }
}
const car1 = new CarP("V8", 4, "Red");
const car2 = car1.clone();
car2.display(); // Car with V8 engine, 4 wheels, and Red colour
car2.engine = "V12";
car2.colour = "Yellow";
car2.display(); // Car with V12 engine, 4 wheels, and Yellow colour
