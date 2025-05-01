/**
 * Adapter Patter (Wrapper)
 * 
 * Use When:
 * You want to use an existing class but its interface doesn’t match your needs.
 * Integrating with legacy code.
 * 
 * How it works:
 * The adapter wraps the existing class and translates the interface into something the client can understand.
 * 
 * Purpose: Converts one interface into another expected by the client.
 * 
 * Real-life:
 * Adapters in chargers (USB-C to Lightning).
 * Wrapping old APIs for use with new codebases.
 * 
 * Pros:
 * Easy integration of legacy code.
 * Promotes code reusability.
 * 
 * Cons:
 * Adds extra abstraction.
 * Can complicate maintenance.
 */

class OldPrinter {
    printText(text: string): void {
        console.log(`Printing: ${text}`);
    }
}

interface NewPrinter {
    printDocument(message: string): void;
}

class PrinterAdapter implements NewPrinter {
    constructor(private oldPrinter: OldPrinter) {}

    printDocument(message: string): void {
        this.oldPrinter.printText(message);
    }
}

// Usage
const oldPrinter = new OldPrinter();
const printer = new PrinterAdapter(oldPrinter);
printer.printDocument("Hello, Adapter!") // Printing: Hello, Adapter! - Uses the old interface behind the scenes