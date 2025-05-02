"use strict";
// ITERATOR PATTERN
// The Iterator pattern provides a way to access elements of an aggregate object
// sequentially without exposing its underlying representation.
// Concrete iterator
class AlphabeticalOrderIterator {
    constructor(collection, reverse = false) {
        this.collection = collection;
        this.reverse = reverse;
        this.position = 0;
        if (reverse) {
            this.position = collection.getItems().length - 1;
        }
    }
    current() {
        return this.collection.getItems()[this.position];
    }
    next() {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }
    hasNext() {
        if (this.reverse) {
            return this.position >= 0;
        }
        return this.position < this.collection.getItems().length;
    }
    key() {
        return this.position;
    }
    reset() {
        this.position = this.reverse ? this.collection.getItems().length - 1 : 0;
    }
}
// Concrete collection
class WordsCollection {
    constructor() {
        this.items = [];
    }
    getItems() {
        return this.items;
    }
    addItem(item) {
        this.items.push(item);
    }
    createIterator() {
        return new AlphabeticalOrderIterator(this);
    }
    createReverseIterator() {
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
