/*
The Singleton pattern ensures a class has only one instance and provides a global point
of access to that instance.

What it does:
Ensures that a class has only one instance and provides a global point of access to it.

When to use:
When you need exactly one object to coordinate actions across a system (e.g. a Logger, Configuration Manager, Database Connection).
When global state is acceptable and required in a controlled manner.

How it works:
You prevent external instantiation of the class.
Maintain a static reference to a single instance.
Provide a static method to access it.

Pros:
Ensures a single instance is used across the application.
Provides a global point of access to the instance.

Cons:
Can introduce hidden dependencies, making testing and debugging harder.
May make the code harder to understand and maintain.

Real-World Example:
A configuration manager that loads application settings only once, ensuring all components 
access the same configuration.
*/

class Singleton {
    private static instance: Singleton | null = null;
    private value: number;

    private constructor() {
        this.value = Math.random();
    }

    static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    getValue(): number {
        return this.value;
    }
}

const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

console.log(singleton1.getValue() === singleton2.getValue()); // true
