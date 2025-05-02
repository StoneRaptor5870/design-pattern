// TEMPLATE METHOD PATTERN
// The Template Method pattern defines the skeleton of an algorithm in a method,
// deferring some steps to subclasses. It allows subclasses to redefine certain steps
// without changing the algorithm's structure.

/**
 * What it does:
 * Defines the skeleton of an algorithm in a method, allowing subclasses to override certain
 * steps of the algorithm without changing its structure.
 * 
 * When to use:
 * When you have a fixed sequence of steps, but some steps should be customizable by subclasses.
 * To avoid code duplication for algorithms that share a common structure.
 * 
 * How it works:
 * Abstract Class: Defines the template method, which contains the steps of the algorithm.
 * Concrete Class: Implements the custom steps by overriding specific methods in the template.
 * 
 * Real-life example:
 * A coffee-making process could follow a set sequence: boil water, brew coffee, pour into a cup,
 * and add sugar. Some of the steps can vary (e.g., whether or not to add sugar).
 * 
 * Pros:
 * Promotes code reuse.
 * Follows the Hollywood Principle (don’t call us, we’ll call you).
 * Makes algorithms easier to understand by providing a clear structure.
 * 
 * Cons:
 * Subclasses can override methods, which can lead to unpredictable results if not managed well.
 * Can lead to a large inheritance hierarchy.
 */

// Abstract class with template method
abstract class DataProcessor {
    // Template method - defines the algorithm
    public processData(): void {
        this.readData();
        this.processDataBeforeSaving();
        this.saveData();
        this.sendNotification();
        this.logProcess();
    }

    // Abstract methods - to be implemented by subclasses
    protected abstract readData(): void;
    protected abstract processDataBeforeSaving(): void;
    protected abstract saveData(): void;

    // Hooks with default implementation
    protected sendNotification(): void {
        console.log("Base notification sent");
    }

    // Concrete operations
    protected logProcess(): void {
        console.log("Data processing completed and logged");
    }
}

// Concrete implementations
class DatabaseDataProcessor extends DataProcessor {
    protected readData(): void {
        console.log("Reading data from database");
    }

    protected processDataBeforeSaving(): void {
        console.log("Processing data from database format");
    }

    protected saveData(): void {
        console.log("Saving data to the database");
    }

    // Override hook
    protected sendNotification(): void {
        console.log("Database specific notification sent");
    }
}

class FileDataProcessor extends DataProcessor {
    protected readData(): void {
        console.log("Reading data from file");
    }

    protected processDataBeforeSaving(): void {
        console.log("Processing data from file format");
    }

    protected saveData(): void {
        console.log("Saving data to file");
    }
}

// Client
function clientTemplateMethod() {
    console.log("Database processor:");
    const dbProcessor = new DatabaseDataProcessor();
    dbProcessor.processData();

    console.log("\nFile processor:");
    const fileProcessor = new FileDataProcessor();
    fileProcessor.processData();
}

// Demo
console.log("TEMPLATE METHOD PATTERN DEMO:");
clientTemplateMethod();
console.log("\n")

/*
TEMPLATE METHOD PATTERN DEMO:
Database processor:
Reading data from database
Processing data from database format
Saving data to the database
Database specific notification sent
Data processing completed and logged

File processor:
Reading data from file
Processing data from file format
Saving data to file
Base notification sent
Data processing completed and logged
*/