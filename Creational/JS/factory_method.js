"use strict";
/*
The Factory Method is a design pattern that defines an interface for creating objects
but lets subclasses alter the type of objects that will be created.

Pros:
Promotes loose coupling between client classes and the classes they instantiate.
Makes it easier to introduce new types of products (e.g., animals) without changing the client code.

Cons:
Can lead to an increase in the number of classes.

Real-World Example:
In a game, you might have different types of characters (warrior, mage, etc.), and you can use
the Factory Method to create instances of each character type dynamically.
*/
class Dog {
    speak() {
        console.log("Woof!");
    }
}
class Cat {
    speak() {
        console.log("Meow!");
    }
}
class AnimalFactory {
    createAnimal(type) {
        if (type === 'dog') {
            return new Dog();
        }
        else if (type === "cat") {
            return new Cat();
        }
        throw new Error("Invalid animal type");
    }
}
const factory = new AnimalFactory();
const dog = factory.createAnimal("dog");
dog.speak(); // Woof!
const cat = factory.createAnimal("cat");
cat.speak(); // Meow!
