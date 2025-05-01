"use strict";
/**
 * Attach new behaviors to objects at runtime without modifying their structure.
 *
 * Purpose: Dynamically add new behavior to objects without altering their structure.
 *
 * Use When:
 * You want to add responsibilities dynamically.
 * Subclassing would lead to an explosion of classes.
 *
 * How it works:
 * Wrap the original object with a new object that adds behavior.
 *
 * Real-life:
 * Middleware in Express.js.
 * React Higher-Order Components (HOCs).
 *
 * Pros:
 * Adds behavior without modifying the original class.
 * Follows the Open/Closed principle.
 *
 * Cons:
 * Can become hard to manage with many layers.
 */
class SimpleCoffee {
    getCost() {
        return 5;
    }
    getDescription() {
        return "Simple Coffee";
    }
}
class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    getCost() {
        return this.coffee.getCost();
    }
    getDescription() {
        return this.coffee.getDescription();
    }
}
class MilkDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }
    getCost() {
        return this.coffee.getCost() + 2;
    }
    getDescription() {
        return `${this.coffee.getDescription()}, with milk`;
    }
}
class WhipDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }
    getCost() {
        return this.coffee.getCost() + 3;
    }
    getDescription() {
        return `${this.coffee.getDescription()}, with whip`;
    }
}
class VanillaDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }
    getCost() {
        return this.coffee.getCost() + 1.5;
    }
    getDescription() {
        return `${this.coffee.getDescription()}, with vanilla`;
    }
}
// Usage
let myCoffee = new SimpleCoffee();
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);
// Simple Coffee costs $5
myCoffee = new MilkDecorator(myCoffee);
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);
// Simple Coffee, with milk costs $7
myCoffee = new WhipDecorator(myCoffee);
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);
// Simple Coffee, with milk, with whip costs $10
myCoffee = new VanillaDecorator(myCoffee);
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);
// Simple Coffee, with milk, with whip, with vanilla costs $11.5
