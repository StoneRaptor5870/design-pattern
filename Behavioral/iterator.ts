// ITERATOR PATTERN
// The Iterator pattern provides a way to access elements of an aggregate object
// sequentially without exposing its underlying representation.

/**
 * What it does:
 * Provides a way to access elements of a collection sequentially without exposing its internal structure.
 * 
 * When to use:
 * When you need to traverse a custom collection (e.g., tree, graph, or complex data structure).
 * When you want to decouple traversal logic from the collection itself.
 * When collections need multiple simultaneous traversals.
 * 
 * How it works:
 * Iterator: Defines the interface for accessing elements (next(), hasNext()).
 * ConcreteIterator: Implements the interface.
 * Aggregate: Defines a method to return the iterator.
 * ConcreteAggregate: Implements that method and stores items.
 * 
 * Real-life example:
 * Think of a TV remote that goes through channels. You don’t need to know how channels are stored,
 * just use next() and hasNext().
 * 
 * Pros:
 * Encapsulates traversal logic.
 * Supports different traversal strategies.
 * Simplifies collection interface.
 * 
 * Cons:
 * Can be overkill for simple collections (like arrays).
 * Adds overhead if not needed.
 */

// Iterator interface
interface MyIterator<T> {
    current(): T;
    next(): T;
    hasNext(): boolean;
    key(): number;
    reset(): void;
}

// Aggregate interface
interface Aggregator<T> {
    createIterator(): MyIterator<T>;
}

// Concrete iterator
class AlphabeticalOrderIterator<T> implements MyIterator<T> {
    private position: number = 0;

    constructor(
        private collection: WordsCollection,
        private reverse: boolean = false
    ) {
        if (reverse) {
            this.position = collection.getItems().length - 1;
        }
    }

    current(): T {
        return this.collection.getItems()[this.position] as T;
    }

    next(): T {
        const item = this.collection.getItems()[this.position] as T;
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    hasNext(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }
        return this.position < this.collection.getItems().length;
    }

    key(): number {
        return this.position;
    }

    reset(): void {
        this.position = this.reverse ? this.collection.getItems().length - 1 : 0;
    }
}

// Concrete collection
class WordsCollection implements Aggregator<string> {
    private items: string[] = [];

    getItems(): string[] {
        return this.items;
    }

    addItem(item: string): void {
        this.items.push(item);
    }

    createIterator(): MyIterator<string> {
        return new AlphabeticalOrderIterator(this);
    }

    createReverseIterator(): MyIterator<string> {
        return new AlphabeticalOrderIterator(this, true);
    }
}

// Client code
function clientIterator() {
    const collection = new WordsCollection();
    collection.addItem("First");
    collection.addItem("Second");
    collection.addItem("Third");

    console.log("Forward iteration:");
    const iterator = collection.createIterator();
    while (iterator.hasNext()) {
        console.log(iterator.next());
    }

    console.log("Reverse iteration:");
    const reverseIterator = collection.createReverseIterator();
    while (reverseIterator.hasNext()) {
        console.log(reverseIterator.next());
    }
}

// Demo
console.log("ITERATOR PATTERN DEMO:");
clientIterator();
console.log("\n");

/*
ITERATOR PATTERN DEMO:
Forward iteration:
First
Second
Third
Reverse iteration:
Third
Second
First
*/