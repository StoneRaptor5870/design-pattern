"use strict";
// Subject
class Channel {
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(sub => sub !== observer);
    }
    notify(message) {
        for (const observer of this.observers) {
            observer.update(message);
        }
    }
    publishVideo(title) {
        console.log(`New video uploaded: ${title}`);
        this.notify(`Watch our new video: ${title}`);
    }
}
// Concrete Observers
class Subscriber {
    constructor(name) {
        this.name = name;
    }
    update(message) {
        console.log(`${this.name} received: ${message}`);
    }
}
// Usage
const channel = new Channel();
const alice = new Subscriber("Alice");
const bob = new Subscriber("Bob");
channel.subscribe(alice);
channel.subscribe(bob);
channel.publishVideo("Observer Pattern in TypeScript");
// Output:
// New video uploaded: Observer Pattern in TypeScript
// Alice received: Watch our new video: Observer Pattern in TypeScript
// Bob received: Watch our new video: Observer Pattern in TypeScript
