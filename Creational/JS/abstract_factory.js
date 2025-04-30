"use strict";
/*
The Abstract Factory pattern provides an interface for creating families of related or
dependent objects without specifying their concrete classes.

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
    speak() {
        console.log("Woof!");
    }
}
class CatAF {
    speak() {
        console.log("Meow!");
    }
}
class DogFood {
    prepare() {
        console.log("Preparing dog food.");
    }
}
class CatFood {
    prepare() {
        console.log("Preparing cat food");
    }
}
class AnimalFactoryAF {
}
class DogFactory extends AnimalFactoryAF {
    createAnimal() {
        return new DogAF();
    }
    createFood() {
        return new DogFood();
    }
}
class CatFactory extends AnimalFactoryAF {
    createAnimal() {
        return new CatAF();
    }
    createFood() {
        return new CatFood();
    }
}
const dogFactory = new DogFactory();
const dogAF = dogFactory.createAnimal();
dogAF.speak(); // Woof!
const dogFood = dogFactory.createFood();
dogFood.prepare(); // Preparing dog food
const catFactory = new CatFactory();
const catAF = catFactory.createAnimal();
catAF.speak(); // Meow!
const catFood = catFactory.createFood();
catFood.prepare(); // Preparing cat food
