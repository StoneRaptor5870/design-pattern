/* 
The Factory Method is a design pattern that defines an interface for creating objects
but lets subclasses alter the type of objects that will be created.

What it does:
Defines an interface for creating an object, but lets subclasses decide which class to instantiate.

When to use:
When the exact type of the object isn't known until runtime.
When creating objects directly in code would violate the Open/Closed Principle.

How it works:
An abstract class or interface declares a factory method.
Subclasses override it to create specific products.

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
    speak(): void {
        console.log("Woof!")
    }
}

class Cat {
    speak(): void {
        console.log("Meow!");
    }
}

interface Animal {
    speak(): void;
}

class AnimalFactory {
    createAnimal(type: string): Animal {
        if (type === 'dog') {
            return new Dog();
        } else if (type === "cat") {
            return new Cat();
        }
        throw new Error("Invalid animal type");
    }
}

const factory = new AnimalFactory();
const dog: Animal = factory.createAnimal("dog");
dog.speak(); // Woof!
const cat: Animal = factory.createAnimal("cat");
cat.speak(); // Meow!