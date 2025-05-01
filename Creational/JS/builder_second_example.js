"use strict";
class Pizza {
    constructor() {
        this.toppings = [];
        this.size = '';
        this.crustType = '';
        this.sauce = '';
        this.extraCheese = false;
    }
    describe() {
        return `A ${this.size} pizza with ${this.crustType} crust, ${this.sauce} sauce, ${this.toppings.join(', ')} toppings${this.extraCheese ? ' and extra cheese' : ''}.`;
    }
}
class PizzaBuilder {
    constructor() {
        this.pizza = new Pizza();
    }
    setSize(size) {
        this.pizza.size = size;
        return this;
    }
    setCrustType(crustType) {
        this.pizza.crustType = crustType;
        return this;
    }
    setSauce(sauce) {
        this.pizza.sauce = sauce;
        return this;
    }
    addTopping(topping) {
        this.pizza.toppings.push(topping);
        return this;
    }
    addExtraCheese() {
        this.pizza.extraCheese = true;
        return this;
    }
    build() {
        return this.pizza;
    }
}
class PizzaDirector {
    constructPepperoniPizza(builder) {
        return builder
            .setSize('medium')
            .setCrustType('regular')
            .setSauce('tomato')
            .addTopping('pepperoni')
            .build();
    }
    constructVegetarianPizza(builder) {
        return builder
            .setSize('large')
            .setCrustType('thin')
            .setSauce('tomato')
            .addTopping('mushrooms')
            .addTopping('peppers')
            .addTopping('onions')
            .build();
    }
}
// Usage
const customPizza = new PizzaBuilder()
    .setSize('large')
    .setCrustType('thin')
    .setSauce('tomato')
    .addTopping('pepperoni')
    .addTopping('mushrooms')
    .addExtraCheese()
    .build();
console.log(customPizza.describe());
// Using the director
const director = new PizzaDirector();
const pepperoniPizza = director.constructPepperoniPizza(new PizzaBuilder());
console.log(pepperoniPizza.describe());
