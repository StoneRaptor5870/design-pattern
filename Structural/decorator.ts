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

interface Coffee {
    getCost(): number;
    getDescription(): string;
}

class SimpleCoffee implements Coffee {
    getCost(): number {
        return 5;
    }

    getDescription(): string {
        return "Simple Coffee";
    }
}

abstract class CoffeeDecorator implements Coffee {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    getCost(): number {
        return this.coffee.getCost();
    }

    getDescription(): string {
        return this.coffee.getDescription();
    }
}

class MilkDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    getCost(): number {
        return this.coffee.getCost() + 2;
    }

    getDescription(): string {
        return `${this.coffee.getDescription()}, with milk`;
    }
}

class WhipDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    getCost(): number {
        return this.coffee.getCost() + 3;
    }

    getDescription(): string {
        return `${this.coffee.getDescription()}, with whip`;
    }
}

class VanillaDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    getCost(): number {
        return this.coffee.getCost() + 1.5;
    }

    getDescription(): string {
        return `${this.coffee.getDescription()}, with vanilla`;
    }
}

// Usage
let myCoffee: Coffee = new SimpleCoffee();
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