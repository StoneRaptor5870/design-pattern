/*
The Abstract Factory pattern provides an interface for creating families of related or
dependent objects without specifying their concrete classes.

What it does:
Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

When to use:
When your system needs to be independent of how its objects are created.
When you want to ensure consistency among products in a family (e.g., GUI components that look the same across platforms).
When you want to switch entire product families easily.

How it works:
Define abstract product interfaces (e.g., Button, Checkbox).
Create concrete products that implement those interfaces.
Define an abstract factory interface that declares creation methods for each product.
Implement concrete factories for different product families.

Pros:
Allows the creation of related objects in a consistent manner.
Promotes loose coupling and separation of concerns.

Cons:
Can lead to a large number of factory classes if the number of families (e.g., dog vs. cat) increases.

Real-World Example:
A GUI framework that allows users to choose different themes (light, dark, etc.), where
the Abstract Factory provides the components for the interface (buttons, text fields, etc.).
*/

class DogAF {
    speak(): void {
        console.log("Woof!");
    }
}

class CatAF {
    speak(): void {
        console.log("Meow!");
    }
}

class DogFood {
    prepare(): void {
        console.log("Preparing dog food.");
    }
}

class CatFood {
    prepare(): void {
        console.log("Preparing cat food");
    }
}

interface Animal {
    speak(): void
}

interface Food {
    prepare(): void
}

abstract class AnimalFactoryAF {
    abstract createAnimal(): Animal;
    abstract createFood(): Food;
}

class DogFactory extends AnimalFactoryAF {
    createAnimal(): Animal {
        return new DogAF();
    }
    createFood(): Food {
        return new DogFood();
    }
}

class CatFactory extends AnimalFactoryAF {
    createAnimal(): Animal {
        return new CatAF();
    }
    createFood(): Food {
        return new CatFood();
    }
}

const dogFactory = new DogFactory();
const dogAF: Animal = dogFactory.createAnimal();
dogAF.speak(); // Woof!
const dogFood: Food = dogFactory.createFood();
dogFood.prepare(); // Preparing dog food

const catFactory = new CatFactory();
const catAF: Animal = catFactory.createAnimal();
catAF.speak(); // Meow!
const catFood: Food = catFactory.createFood();
catFood.prepare(); // Preparing cat food