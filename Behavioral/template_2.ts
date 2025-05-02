// Abstract Class defining the template method
abstract class CoffeeTemplate {
    // Template method defining the skeleton of the algorithm
    public makeCoffee(): void {
      this.boilWater();
      this.brewCoffeeGrinds();
      this.pourInCup();
      this.addCondiments();
    }
  
    // Steps to be implemented by subclasses
    protected abstract boilWater(): void;
    protected abstract brewCoffeeGrinds(): void;
    protected abstract pourInCup(): void;
    protected abstract addCondiments(): void;
  }
  
  // Concrete Class that implements the abstract methods
  class CoffeeWithHook extends CoffeeTemplate {
    protected boilWater(): void {
      console.log("Boiling water...");
    }
  
    protected brewCoffeeGrinds(): void {
      console.log("Brewing coffee grounds...");
    }
  
    protected pourInCup(): void {
      console.log("Pouring coffee into cup...");
    }
  
    protected addCondiments(): void {
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
  