// MEDIATOR PATTERN
// The Mediator pattern defines an object that encapsulates how a set of objects interact,
// promoting loose coupling by keeping objects from referring to each other explicitly.

/**
 * What it does:
 * Centralizes communication between multiple objects (colleagues) so they don’t communicate with
 * each other directly, reducing coupling.
 * 
 * When to use:
 * When a system has many objects that interact in complex ways.
 * When you want to simplify object communication.
 * When you want to reduce dependencies between components.
 * 
 * How it works:
 * Mediator: Defines an interface for communication between colleague objects.
 * ConcreteMediator: Coordinates communication.
 * Colleague: Components that communicate via the mediator.
 * 
 * Real-life example:
 * An air traffic controller is a mediator — pilots don’t talk directly to each other; they go through the controller.
 * 
 * Pros:
 * Reduces coupling between components.
 * Centralizes control logic.
 * Makes code easier to maintain.
 * 
 * Cons:
 * Mediator can become a god object if it gets too complex.
 * Overhead for simple scenarios.
 */

// Mediator interface
interface ChatMediator {
    sendMessage(message: string, user: User): void;
    addUser(user: User): void;
}

// Colleague abstract class
abstract class User {
    constructor(protected mediator: ChatMediator, protected name: string) { }

    abstract send(message: string): void;
    abstract receive(message: string): void;
}

// Concrete mediator
class ChatRoom implements ChatMediator {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    sendMessage(message: string, sender: User): void {
        this.users.forEach(user => {
            if (user !== sender) {
                user.receive(message);
            }
        });
    }
}

// Concrete colleague
class ChatUser extends User {
    send(message: string): void {
        console.log(`${this.name} send: ${message}`);
        this.mediator.sendMessage(message, this);
    }

    receive(message: string): void {
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