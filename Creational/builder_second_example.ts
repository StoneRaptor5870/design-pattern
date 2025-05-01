class Pizza {
    toppings: string[] = [];
    size: string = '';
    crustType: string = '';
    sauce: string = '';
    extraCheese: boolean = false;

    describe(): string {
        return `A ${this.size} pizza with ${this.crustType} crust, ${this.sauce} sauce, ${this.toppings.join(', ')} toppings${this.extraCheese ? ' and extra cheese' : ''}.`;
    }
}

class PizzaBuilder {
    private pizza: Pizza = new Pizza();

    setSize(size: string): PizzaBuilder {
        this.pizza.size = size;
        return this;
    }

    setCrustType(crustType: string): PizzaBuilder {
        this.pizza.crustType = crustType;
        return this;
    }

    setSauce(sauce: string): PizzaBuilder {
        this.pizza.sauce = sauce;
        return this;
    }

    addTopping(topping: string): PizzaBuilder {
        this.pizza.toppings.push(topping);
        return this;
    }

    addExtraCheese(): PizzaBuilder {
        this.pizza.extraCheese = true;
        return this;
    }

    build(): Pizza {
        return this.pizza;
    }
}

class PizzaDirector {
    constructPepperoniPizza(builder: PizzaBuilder): Pizza {
        return builder
            .setSize('medium')
            .setCrustType('regular')
            .setSauce('tomato')
            .addTopping('pepperoni')
            .build();
    }

    constructVegetarianPizza(builder: PizzaBuilder): Pizza {
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