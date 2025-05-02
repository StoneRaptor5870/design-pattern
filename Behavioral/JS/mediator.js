"use strict";
// MEDIATOR PATTERN
// The Mediator pattern defines an object that encapsulates how a set of objects interact,
// promoting loose coupling by keeping objects from referring to each other explicitly.
// Colleague abstract class
class User {
    constructor(mediator, name) {
        this.mediator = mediator;
        this.name = name;
    }
}
// Concrete mediator
class ChatRoom {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
    sendMessage(message, sender) {
        this.users.forEach(user => {
            if (user !== sender) {
                user.receive(message);
            }
        });
    }
}
// Concrete colleague
class ChatUser extends User {
    send(message) {
        console.log(`${this.name} send: ${message}`);
        this.mediator.sendMessage(message, this);
    }
    receive(message) {
        console.log(`${this.name} receives: ${message}`);
    }
}
// Client
function clientMediator() {
    const chatroom = new ChatRoom();
    const alice = new ChatUser(chatroom, "Alice");
    const bob = new ChatUser(chatroom, "Bob");
    const charlie = new ChatUser(chatroom, "Charlie");
    chatroom.addUser(alice);
    chatroom.addUser(bob);
    chatroom.addUser(charlie);
    alice.send("Hello, everyone!");
    console.log("---");
    bob.send("Hi, Alice!");
    console.log("---");
    charlie.send("Hello, Alice!");
}
// Demo
console.log("MEDIATOR PATTERN DEMO:");
clientMediator();
console.log("\n");
/*
MEDIATOR PATTERN DEMO:
Alice send: Hello, everyone!
Bob receives: Hello, everyone!
Charlie receives: Hello, everyone!
---
Bob send: Hi, Alice!
Alice receives: Hi, Alice!
Charlie receives: Hi, Alice!
---
Charlie send: Hello, Alice!
Alice receives: Hello, Alice!
Bob receives: Hello, Alice!
*/ 
