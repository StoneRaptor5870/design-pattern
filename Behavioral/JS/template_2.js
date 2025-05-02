"use strict";
// Abstract Class defining the template method
class CoffeeTemplate {
    // Template method defining the skeleton of the algorithm
    makeCoffee() {
        this.boilWater();
        this.brewCoffeeGrinds();
        this.pourInCup();
        this.addCondiments();
    }
}
// Concrete Class that implements the abstract methods
class CoffeeWithHook extends CoffeeTemplate {
    boilWater() {
        console.log("Boiling water...");
    }
    brewCoffeeGrinds() {
        console.log("Brewing coffee grounds...");
    }
    pourInCup() {
        console.log("Pouring coffee into cup...");
    }
    addCondiments() {
        console.log("Adding sugar and milk...");
    }
}
// Usage
const coffee = new CoffeeWithHook();
coffee.makeCoffee();
// Output:
// Boiling water...
// Brewing coffee grounds...
// Pouring coffee into cup...
// Adding sugar and milk...
