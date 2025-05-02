================================================
### <a name="table">Design Patterns</a>

## 1. [Creational Patterns](#1-creational-patterns)

1.1. Factory Method  
1.2. Abstract Factory  
1.3. Builder  
1.4. Singleton  
1.5. Prototype  

## 2. [Structural Patterns](#2-structural-patterns)

2.1. Adapter  
2.2. Bridge  
2.3. Composite  
2.4. Decorator  
2.5. Facade  
2.6. Flyweight  
2.7. Proxy  

## 3. [Behavioral Patterns](#3-behavioral-patterns)

3.1. Chain of Responsibility  
3.2. Command  
3.3. Iterator  
3.4. Mediator  
3.5. Memento  
3.6. Observer  
3.7. State  
3.8. Strategy  
3.9. Template Method  
3.10. Visitor  
================================================

================================================
 Behavioral/chain_of_responsibility.ts
================================================
// CHAIN OF RESPONSIBILITY PATTERN
// The Chain of Responsibility pattern passes a request along a chain of handlers.
// Each handler decides either to process the request or pass it to the next handler.

/**
 * What it does:
 * Allows a request to be passed along a chain of handlers until one of them handles it.
 * 
 * When to use:
 * You want to decouple the sender of a request from its receiver.
 * Multiple objects may handle the request.
 * Handlers should be dynamically configurable.
 * 
 * How it works:
 * Each handler has a reference to the next handler. When a request is received, a handler
 * processes it or passes it along the chain.
 * 
 * Real-life example:
 * A customer support system where a query is passed from a chatbot → junior agent → senior agent.
 * 
 * Pros:
 * Reduces coupling between sender and receiver.
 * Can add/remove handlers easily.
 * 
 * Cons:
 * No guarantee the request will be handled.
 * Can be hard to trace the request path in long chains.
 */

// Handler interface
interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string | null;
}

// Abstract base handler that implements the chaining logic
abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | null = null;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler
    }

    handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

// Concrete handlers
class EmailHandler extends AbstractHandler {
    handle(request: string): string | null {
        if (request === 'email') {
            return `EmailHandler: I'll handle the ${request} request.`;
        }
        console.log(`EmailHandler: I can't handle ${request}, passing to next.`);
        return super.handle(request);
    }
}

class SMSHandler extends AbstractHandler {
    handle(request: string): string | null {
        if (request === "sms") {
            return `SMSHandler: I'll handle the ${request} request.`;
        }
        console.log(`SMSHandler: I can't handle ${request}, passing to next.`);
        return super.handle(request);
    }
}

class PushNotificationHandler extends AbstractHandler {
    handle(request: string): string | null {
        if (request === "push") {
            return `PushNotificationHandler: I'll handle the ${request} request.`;
        }
        console.log(`PushNotificationHandler: I can't handle ${request}, passing to next.`);
        return super.handle(request);
    }
}

// Client code
function clientChainOfResponsibility() {
    const email = new EmailHandler();
    const sms = new SMSHandler();
    const push = new PushNotificationHandler();

    // Build the chain
    email.setNext(sms).setNext(push);

    console.log("Chain: Email > SMS > Push\n");

    // Testing different requests
    console.log(email.handle("email") || "No handler found");
    console.log(email.handle("sms") || "No handler found");
    console.log(email.handle("push") || "No handler found");
    console.log(email.handle("social") || "No handler found");
}

// Demo
console.log("CHAIN OF RESPONSIBILITY PATTERN DEMO:");
clientChainOfResponsibility();
console.log("\n");

/*
CHAIN OF RESPONSIBILITY PATTERN DEMO:
Chain: Email > SMS > Push

EmailHandler: I'll handle the email request.
EmailHandler: I can't handle sms, passing to next.
SMSHandler: I'll handle the sms request.
EmailHandler: I can't handle push, passing to next.
SMSHandler: I can't handle push, passing to next.
PushNotificationHandler: I'll handle the push request.
EmailHandler: I can't handle social, passing to next.
SMSHandler: I can't handle social, passing to next.
PushNotificationHandler: I can't handle social, passing to next.     
No handler found
*/


================================================
 Behavioral/chain_of_responsibility_2.ts
================================================
// Handler Interface
interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string | null;
}

// Abstract Handler
abstract class AbstractHandler2 implements Handler {
    private nextHandler: Handler | null = null;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

// Concrete Handlers
class SpamFilter extends AbstractHandler2 {
    public handle(request: string): string | null {
        if (request === "spam") {
            return "SpamFilter: Marked as spam.";
        }
        return super.handle(request);
    }
}

class SalesHandler extends AbstractHandler2 {
    public handle(request: string): string | null {
        if (request === "sales") {
            return "SalesHandler: Handled sales request.";
        }
        return super.handle(request);
    }
}

class SupportHandler extends AbstractHandler2 {
    public handle(request: string): string | null {
        if (request === "support") {
            return "SupportHandler: Handled support request.";
        }
        return super.handle(request);
    }
}

// Usage
const spam = new SpamFilter();
const sales = new SalesHandler();
const support = new SupportHandler();

spam.setNext(sales).setNext(support);

const requests = ["support", "sales", "spam", "unknown"];

for (const req of requests) {
    const result = spam.handle(req);
    console.log(`${req}: ${result ?? "No handler available"}`);
}

/*
support: SupportHandler: Handled support request.
sales: SalesHandler: Handled sales request.
spam: SpamFilter: Marked as spam.
unknown: No handler available
*/



================================================
 Behavioral/command.ts
================================================
// COMMAND PATTERN
// The Command pattern encapsulates a request as an object, allowing parameterization of clients
// with different requests, queuing of requests, and logging of the operations.

/**
 * What it does:
 * Encapsulates a request as an object, thereby allowing you to parameterize clients with queues,
 * undo operations, and logging.
 * 
 * When to use:
 * You want to decouple the object that invokes the operation from the one that knows how to perform it.
 * You want to support undo/redo.
 * You want to queue or log operations.
 * 
 * How it works:
 * Command: An interface or abstract class defining an execute() method.
 * ConcreteCommand: Implements the execute() method and invokes operations on the Receiver.
 * Receiver: Knows how to perform the actual work.
 * Invoker: Asks the command to carry out the request.
 * Client: Creates command objects and assigns them to the invoker.
 * 
 * Real-life example:
 * You use a remote control to turn on the TV or increase volume. The button doesn't know the internals
 * of the TV — it just sends a command.
 * 
 * Pros:
 * Completely decouples sender and receiver.
 * Enables undo/redo functionality.
 * Easy to add new commands.
 *
 * Cons:
 * Can lead to a lot of small classes.
 * May overcomplicate simple tasks.
 */

interface Command {
    execute(): void;
    undo(): void;
}

// Receiver
class Light {
    private isOn = false;

    turnOn(): void {
        this.isOn = true;
        console.log("Light is now ON");
    }

    turnOff(): void {
        this.isOn = false;
        console.log("Light is now OFF");
    }
}

// Concrete command implementations
class LightOnCommand implements Command {
    constructor(private light: Light) { }

    execute(): void {
        this.light.turnOn();
    }

    undo(): void {
        this.light.turnOff();
    }
}

class LightOffCommand implements Command {
    constructor(private light: Light) { }

    execute(): void {
        this.light.turnOff();
    }

    undo(): void {
        this.light.turnOn();
    }
}

// Invoker
class RemoteControl {
    private commands: Command[] = [];
    private undoStack: Command[] = [];

    addCommand(command: Command): void {
        this.commands.push(command);
    }

    executeCommand(index: number): void {
        if (index >= 0 && index < this.commands.length) {
            this.commands[index].execute();
            this.undoStack.push(this.commands[index]);
        }
    }

    undo(): void {
        const command = this.undoStack.pop();
        if (command) {
            command.undo();
        }
    }
}

// Client
function clientCommand() {
    const light = new Light();
    const lightOn = new LightOnCommand(light);
    const lightOff = new LightOffCommand(light);

    const remote = new RemoteControl();
    remote.addCommand(lightOn);      // Button 0
    remote.addCommand(lightOff);     // Button 1

    console.log("Pressing button 0:");
    remote.executeCommand(0);        // Turn on

    console.log("Pressing button 1:");
    remote.executeCommand(1);        // Turn off

    console.log("Undo last command:");
    remote.undo();                   // Undo (turns on)
}

// Demo
console.log("COMMAND PATTERN DEMO:");
clientCommand();
console.log("\n");

/*
COMMAND PATTERN DEMO:
Pressing button 0:
Light is now ON
Pressing button 1:
Light is now OFF
Undo last command:
Light is now ON
*/


================================================
 Behavioral/iterator.ts
================================================
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


================================================
 Behavioral/mediator.ts
================================================
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


================================================
 Behavioral/mediator_2.ts
================================================
// Mediator Interface
interface Mediator {
    notify(sender: Component, event: string): void;
}

// Base Component
abstract class Component {
    protected mediator: Mediator;

    constructor(mediator: Mediator) {
        this.mediator = mediator;
    }
}

// Concrete Components
class Button extends Component {
    click(): void {
        console.log("Button clicked");
        this.mediator.notify(this, "click");
    }
}

class TextBox extends Component {
    show(): void {
        console.log("TextBox is visible");
    }

    hide(): void {
        console.log("TextBox is hidden");
    }
}

// Concrete Mediator
class UIControlMediator implements Mediator {
    private button: Button;
    private textBox: TextBox;

    constructor() {
        this.textBox = new TextBox(this);
        this.button = new Button(this);
    }

    getButton(): Button {
        return this.button;
    }

    getTextBox(): TextBox {
        return this.textBox;
    }

    notify(sender: Component, event: string): void {
        if (sender instanceof Button && event === "click") {
            this.textBox.show();
        }
    }
}

// Usage
const mediator = new UIControlMediator();
const button = mediator.getButton();

button.click(); // Button clicked → TextBox is visible



================================================
 Behavioral/memento.ts
================================================
// MEMENTO PATTERN
// The Memento pattern captures and externalizes an object's internal state without
// violating encapsulation, making it possible to restore the object to this state later.

/**
 * What it does:
 * Captures and externalizes an object's internal state so it can be restored later,
 * without violating encapsulation.
 * 
 * When to use:
 * You need to implement undo/redo.
 * You want to capture snapshots of an object’s state.
 * You don’t want other classes to have direct access to the object’s internals.
 * 
 * How it works:
 * Originator: The object whose state we want to save.
 * Memento: Stores the state.
 * Caretaker: Manages mementos, but doesn’t inspect or modify them.
 * 
 * Real-life example:
 * A text editor with Undo functionality. You can revert to previous versions of your text.
 * 
 * Pros:
 * Preserves encapsulation.
 * Supports rollback/undo functionality.
 * 
 * Cons:
 * Can consume a lot of memory if many mementos are stored.
 * Caretaker may get complex if not managed properly.
 */

// Memento - stores the state
class EditorMemento {
    constructor(private content: string) { }

    getContent(): string {
        return this.content;
    }
}

// Originator - the object whose state we want to save
class TextEditor {
    private content: string = "";

    setContent(content: string): void {
        this.content = content;
    }

    getContent(): string {
        return this.content;
    }

    // Creates a memento containing the current state
    save(): EditorMemento {
        return new EditorMemento(this.content);
    }

    // Restores the state from a memento
    restore(memento: EditorMemento): void {
        this.content = memento.getContent();
    }
}

// Caretaker - keeps track of multiple mementos
class MementoHistory {
    private mementos: EditorMemento[] = [];

    push(memento: EditorMemento): void {
        this.mementos.push(memento);
    }

    pop(): EditorMemento | undefined {
        return this.mementos.pop();
    }
}

// Client
function clientMemento() {
    const editor = new TextEditor();
    const history = new MementoHistory();

    // Make changes and save state
    editor.setContent("First draft");
    history.push(editor.save());
    console.log(`Current content: ${editor.getContent()}`);

    // Make more changes and save state
    editor.setContent("Second draft with revisions");
    history.push(editor.save());
    console.log(`Current content: ${editor.getContent()}`);

    // Make final changes
    editor.setContent("Final version");
    console.log(`Current content: ${editor.getContent()}`);

    // Restore to previous state
    const previousState = history.pop();
    if (previousState) {
        editor.restore(previousState);
        console.log(`After restore to previous: ${editor.getContent()}`);
    }

    // Restore to original state
    const originalState = history.pop();
    if (originalState) {
        editor.restore(originalState);
        console.log(`After restore to original: ${editor.getContent()}`);
    }
}

// Demo
console.log("MEMENTO PATTERN DEMO:");
clientMemento();
console.log("\n");

/*
MEMENTO PATTERN DEMO:
Current content: First draft
Current content: Second draft with revisions
Current content: Final version
After restore to previous: Second draft with revisions
After restore to original: First draft
*/


================================================
 Behavioral/observer.ts
================================================
// OBSERVER PATTERN
// The Observer pattern defines a one-to-many dependency between objects, so when one
// object changes state, all its dependents are notified and updated automatically.

/**
 * What it does:
 * Defines a one-to-many dependency between objects so that when one object changes state,
 * all its dependents are notified automatically.
 * 
 * When to use:
 * When changes in one object should automatically trigger updates in others.
 * When you want to implement event handling systems or pub/sub mechanisms.
 * 
 * How it works:
 * Subject: Maintains a list of observers and notifies them on changes.
 * Observer: Interface that gets notified by the subject.
 * ConcreteObserver: Implements the update logic when notified.
 * 
 * Real-life example:
 * A YouTube channel is a Subject; its subscribers are Observers. When a new video is posted, all subscribers get notified.
 * 
 * Pros:
 * Promotes loose coupling.
 * Supports broadcast communication.
 * Dynamically add/remove observers.
 * 
 * Cons:
 * Can lead to memory leaks if observers aren't removed.
 * Notification order is not guaranteed.
 */

// Subject interface
interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

// Observer interface
interface Observer {
    update(subject: Subject): void;
}

// Concrete subject
class WeatherStation implements Subject {
    private observers: Observer[] = [];
    private temperature: number = 0;

    attach(observer: Observer): void {
        const isExist = this.observers.includes(observer)
        if (!isExist) {
            this.observers.push(observer);
            console.log("Weather station: Observer attached");
        }
    }

    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
            console.log("Weather station: Observer detached");
        }
    }

    notify(): void {
        console.log("Weather station: Notifying observers...");
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    // Methods specific to Weather Station
    setTemperature(temperature: number): void {
        console.log(`Weather station: Temperature changed to ${temperature}`);
        this.temperature = temperature;
        this.notify();
    }

    getTemperature(): number {
        return this.temperature;
    }
}

// Concrete observer
class TemperatureDisplay implements Observer {
    constructor(private name: string) { }

    update(subject: Subject): void {
        if (subject instanceof WeatherStation) {
            console.log(`${this.name} Display: The temperature is now ${subject.getTemperature()}°C`);
        }
    }
}

// Client
function clientObserver() {
    const weatherStation = new WeatherStation();
    const phoneDisplay = new TemperatureDisplay("Phone");
    const laptopDisplay = new TemperatureDisplay("Laptop");

    // Register observers
    weatherStation.attach(phoneDisplay);
    weatherStation.attach(laptopDisplay);

    // Change the temperature to notify observers
    weatherStation.setTemperature(25);

    // Detach an observer and update again
    weatherStation.detach(laptopDisplay);
    weatherStation.setTemperature(30);
}

// Demo
console.log("OBSERVER PATTERN DEMO:");
clientObserver();
console.log("\n");

/*
OBSERVER PATTERN DEMO:
Weather station: Observer attached
Weather station: Observer attached
Weather station: Temperature changed to 25
Weather station: Notifying observers...
Phone Display: The temperature is now 25°C
Laptop Display: The temperature is now 25°C
Weather station: Observer detached
Weather station: Temperature changed to 30
Weather station: Notifying observers...
Phone Display: The temperature is now 30°C
*/


================================================
 Behavioral/observer_2.ts
================================================
// Observer interface
interface Observer2 {
    update(message: string): void;
  }
  
  // Subject
  class Channel {
    private observers: Observer2[] = [];
  
    subscribe(observer: Observer2): void {
      this.observers.push(observer);
    }
  
    unsubscribe(observer: Observer2): void {
      this.observers = this.observers.filter(sub => sub !== observer);
    }
  
    notify(message: string): void {
      for (const observer of this.observers) {
        observer.update(message);
      }
    }
  
    publishVideo(title: string): void {
      console.log(`New video uploaded: ${title}`);
      this.notify(`Watch our new video: ${title}`);
    }
  }
  
  // Concrete Observers
  class Subscriber implements Observer2 {
    constructor(private name: string) {}
  
    update(message: string): void {
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
  


================================================
 Behavioral/state.ts
================================================
// STATE PATTERN
// The State pattern allows an object to alter its behavior when its internal state changes,
// appearing as if the object changed its class.

/**
 * What it does:
 * Allows an object to change its behavior when its internal state changes, appearing as if it changed its class.
 * 
 * When to use:
 * When an object needs to change its behavior based on its internal state.
 * When you want to avoid large conditionals (like if/else or switch) for handling state transitions.
 * 
 * How it works:
 * Context: Maintains an instance of a State subclass to define the current state.
 * State Interface: Declares behavior specific to a particular state.
 * Concrete States: Implement behaviors associated with a state of the context.
 * 
 * Real-life example:
 * A traffic light can be in a Green, Yellow, or Red state. Each state has different behavior, and transitions happen automatically.
 * 
 * Pros:
 * Avoids large if-else blocks.
 * Makes code more organized and maintainable.
 * New states can be added easily.
 * 
 * Cons:
 * Can increase the number of classes.
 * Slightly more complex to implement.
*/

// State interface
interface State {
    handle(context: VendingMachine): void;
    toString(): string;
}

// Context
class VendingMachine {
    private state: State;
    private readonly noMoneyState: State;
    private readonly hasMoneyState: State;
    private readonly soldState: State;
    private readonly soldOutState: State;
    private count: number = 0;

    constructor(count: number) {
        this.noMoneyState = new NoMoneyState();
        this.hasMoneyState = new HasMoneyState();
        this.soldState = new SoldState();
        this.soldOutState = new SoldOutState();

        this.count = count;
        this.state = count > 0 ? this.noMoneyState : this.soldOutState;
    }

    insertMoney(): void {
        this.state.handle(this);
    }

    setState(state: State): void {
        this.state = state;
        console.log(`Vending machine is now in ${this.state.toString()} state`);
    }

    ejectMoney(): void {
        console.log("Money returned");
        this.setState(this.noMoneyState);
    }

    dispense(): void {
        console.log("Item dispensed");
        this.count--;
        this.setState(this.count > 0 ? this.noMoneyState : this.soldOutState);
    }

    getHasMoneyState(): State {
        return this.hasMoneyState;
    }

    getNoMoneyState(): State {
        return this.noMoneyState;
    }

    getSoldState(): State {
        return this.soldState;
    }

    getSoldOutState(): State {
        return this.soldOutState;
    }

    getCount(): number {
        return this.count;
    }
}

class NoMoneyState implements State {
    handle(context: VendingMachine): void {
        console.log("You inserted money");
        context.setState(context.getHasMoneyState());
    }

    toString(): string {
        return "no money";
    }
}

class HasMoneyState implements State {
    handle(context: VendingMachine): void {
        console.log("You turned the knob");
        context.setState(context.getSoldState());
    }

    toString(): string {
        return "has money";
    }
}

class SoldState implements State {
    handle(context: VendingMachine): void {
        context.dispense();
    }

    toString(): string {
        return "sold";
    }
}

class SoldOutState implements State {
    handle(context: VendingMachine): void {
        console.log("The machine is sold out");
    }

    toString(): string {
        return "sold out";
    }
}

// Client code
function clientState() {
    const vendingMachine = new VendingMachine(2);

    console.log("First purchase:");
    vendingMachine.insertMoney();  // Inserts money
    vendingMachine.insertMoney();  // Turns knob (using same method for simplicity)

    console.log("\nSecond purchase:");
    vendingMachine.insertMoney();  // Inserts money
    vendingMachine.insertMoney();  // Turns knob

    console.log("\nTrying to purchase when sold out:");
    vendingMachine.insertMoney();  // Attempts to insert money when sold out
}

// Demo
console.log("STATE PATTERN DEMO:");
clientState();
console.log("\n");

/*
STATE PATTERN DEMO:
First purchase:
You inserted money
Vending machine is now in has money state
You turned the knob
Vending machine is now in sold state

Second purchase:
Item dispensed
Vending machine is now in no money state
You inserted money
Vending machine is now in has money state

Trying to purchase when sold out:
You turned the knob
Vending machine is now in sold state
*/


================================================
 Behavioral/state_2.ts
================================================
// State interface
interface State2 {
    handle(): void;
}

// Concrete States
class GreenLight implements State2 {
    handle(): void {
        console.log("Green Light → Go!");
    }
}

class YellowLight implements State2 {
    handle(): void {
        console.log("Yellow Light → Slow down!");
    }
}

class RedLight implements State2 {
    handle(): void {
        console.log("Red Light → Stop!");
    }
}

// Context
class TrafficLight {
    private state: State2;

    constructor(initialState: State2) {
        this.state = initialState;
    }

    setState(state: State2): void {
        this.state = state;
    }

    request(): void {
        this.state.handle();
    }
}

// Usage
const green = new GreenLight();
const yellow = new YellowLight();
const red = new RedLight();

const light = new TrafficLight(green);

light.request(); // Green Light → Go!

light.setState(yellow);
light.request(); // Yellow Light → Slow down!

light.setState(red);
light.request(); // Red Light → Stop!



================================================
 Behavioral/strategy.ts
================================================
// STRATEGY PATTERN
// The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them
// interchangeable. It lets the algorithm vary independently from clients that use it.

/**
 * What it does:
 * Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.
 * This pattern lets the algorithm vary independently from clients that use it.
 * 
 * When to use:
 * When you have multiple related algorithms or behaviors.
 * When you want to switch between algorithms dynamically.
 * To avoid complex if-else or switch-case blocks.
 * 
 * How it works:
 * Strategy Interface: Defines a common interface for all supported strategies.
 * Concrete Strategies: Implement different versions of the algorithm.
 * Context: Uses a Strategy to perform an operation. 
 * 
 * Real-life example:
 * A navigation app that lets you choose a route strategy: fastest, shortest,
 * or least traffic. You can switch strategies dynamically.
 * 
 * Pros:
 * Promotes Open/Closed Principle (easy to add new strategies).
 * Avoids duplicate code.
 * Algorithms are encapsulated and reusable.
 * 
 * Cons:
 * Adds extra classes and complexity.
 * Clients must understand the differences between strategies.
 */

// Strategy interface
interface PaymentStrategy {
    pay(amount: number): void;
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
    constructor(private cardNumber: string, private cvv: string, private dateOfExpiry: string) { }

    pay(amount: number): void {
        console.log(`Paid ${amount} using Credit Card: ${this.cardNumber}`);
    }
}

class PayPalPayment implements PaymentStrategy {
    constructor(private email: string) { }

    pay(amount: number): void {
        console.log(`Paid ${amount} using PayPal: ${this.email}`);
    }
}

class BitcoinPayment implements PaymentStrategy {
    constructor(private address: string) { }

    pay(amount: number): void {
        console.log(`Paid ${amount} using Bitcoin: ${this.address}`);
    }
}

// Context
class ShoppingCart {
    private items: { name: string, price: number }[] = [];

    addItem(name: string, price: number): void {
        this.items.push({ name, price });
    }

    calculateTotal(): number {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    pay(paymentMethod: PaymentStrategy): void {
        const amount = this.calculateTotal();
        paymentMethod.pay(amount);
    }
}

class PaymentContext {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    pay(amount: number): void {
        this.strategy.pay(amount);
    }
}

// Client
function clientStrategy() {
    const cart = new ShoppingCart();
    cart.addItem("Laptop", 1200);
    cart.addItem("Mouse", 50);

    console.log("Items added, total: $" + cart.calculateTotal());

    // Pay with different strategies
    cart.pay(new CreditCardPayment("1234 5678 9012 3456", "123", "12/25"));
    cart.pay(new PayPalPayment("example@example.com"));
    cart.pay(new BitcoinPayment("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"));
}

function payStrategy() {
    const payment = new PaymentContext(new CreditCardPayment("1234 5678 9012 3456", "123", "12/25"));
    payment.pay(500);
    payment.setStrategy(new PayPalPayment("example@example.com"));
    payment.pay(250);
}

// Demo
console.log("STRATEGY PATTERN DEMO:");
clientStrategy();
console.log("------------------------------");
payStrategy();
console.log("\n");

/*
STRATEGY PATTERN DEMO:
Items added, total: $1250
Paid 1250 using Credit Card: 1234 5678 9012 3456
Paid 1250 using PayPal: example@example.com
Paid 1250 using Bitcoin: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
------------------------------
Paid 500 using Credit Card: 1234 5678 9012 3456
Paid 250 using PayPal: example@example.com
*/


================================================
 Behavioral/template.ts
================================================
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


================================================
 Behavioral/template_2.ts
================================================
// Abstract Class defining the template method
abstract class CoffeeTemplate {
    // Template method defining the skeleton of the algorithm
    public makeCoffee(): void {
      this.boilWater();
      this.brewCoffeeGrinds();
      this.pourInCup();
      this.addCondiments();
    }
  
    // Steps to be implemented by subclasses
    protected abstract boilWater(): void;
    protected abstract brewCoffeeGrinds(): void;
    protected abstract pourInCup(): void;
    protected abstract addCondiments(): void;
  }
  
  // Concrete Class that implements the abstract methods
  class CoffeeWithHook extends CoffeeTemplate {
    protected boilWater(): void {
      console.log("Boiling water...");
    }
  
    protected brewCoffeeGrinds(): void {
      console.log("Brewing coffee grounds...");
    }
  
    protected pourInCup(): void {
      console.log("Pouring coffee into cup...");
    }
  
    protected addCondiments(): void {
      console.log("Adding sugar and milk...");
    }
  }
  
  // Usage
  const coffee = new CoffeeWithHook();
  coffee.makeCoffee();
  // Output:
  // Boiling water...
  // Brewing coffee grounds...
  // Pouring coffee into cup...
  // Adding sugar and milk...
  


================================================
 Behavioral/visitor.ts
================================================
// VISITOR PATTERN
// The Visitor pattern represents an operation to be performed on elements of an object structure
// without changing the classes of the elements it works on.

/**
 * What it does:
 * Allows you to define new operations on elements of an object structure without changing the
 * classes of the elements.
 * 
 * When to use:
 * When you need to perform an operation on elements of an object structure (e.g., a collection of different classes).
 * When the operations that need to be applied to elements are frequently changing.
 * 
 * How it works:
 * Element: An object that accepts a visitor.
 * Visitor: Defines an operation to be performed on the elements.
 * ConcreteVisitor: Implements the actual operation to be performed.
 * Object Structure: A collection of elements that can accept a visitor.
 * 
 * Real-life example:
 * A shopping cart where you have different types of items (e.g., books, electronics).
 * You might want to calculate the price differently depending on the type of item.
 * 
 * Pros:
 * Allows operations to be added without modifying the classes of the elements.
 * Promotes open/closed principle.
 * Reduces the need for conditionals like if or switch based on types.
 * 
 * Cons:
 * Can increase the number of classes.
 * Visitors may become complex if the structure is large.
* Makes elements dependent on the visitor interface, which can reduce flexibility.
*/

// Visitor interface
interface Visitor {
    visitCircle(circle: Circle): void;
    visitRectangle(rectangle: Rectangle): void;
    visitTriangle(triangle: Triangle): void;
}

// Element interface
interface Shape {
    accept(visitor: Visitor): void;
}

// Concrete elements
class Circle implements Shape {
    constructor(public radius: number) { }

    accept(visitor: Visitor): void {
        visitor.visitCircle(this);
    }
}

class Rectangle implements Shape {
    constructor(public width: number, public height: number) { }

    accept(visitor: Visitor): void {
        visitor.visitRectangle(this);
    }
}

class Triangle implements Shape {
    constructor(public side1: number, public side2: number, public side3: number) { }

    accept(visitor: Visitor): void {
        visitor.visitTriangle(this);
    }
}

// Concrete visitors
class AreaCalculator implements Visitor {
    private area: number = 0

    visitCircle(circle: Circle): void {
        this.area = Math.PI * circle.radius * circle.radius;
        console.log(`Circle area: ${this.area.toFixed(2)}`);
    }

    visitRectangle(rectangle: Rectangle): void {
        this.area = rectangle.width * rectangle.height;
        console.log(`Rectangle area: ${this.area.toFixed(2)}`);
    }

    visitTriangle(triangle: Triangle): void {
        // Using Heron's formula
        const s = (triangle.side1 + triangle.side2 + triangle.side3) / 2;
        this.area = Math.sqrt(s * (s - triangle.side1) * (s - triangle.side2) * (s - triangle.side3));
        console.log(`Triangle area: ${this.area.toFixed(2)}`);
    }
}

class PerimeterCalculator implements Visitor {
    private perimeter = 0;

    visitCircle(circle: Circle): void {
        this.perimeter = 2 * Math.PI * circle.radius;
        console.log(`Circle perimeter: ${this.perimeter.toFixed(2)}`);
    }

    visitRectangle(rectangle: Rectangle): void {
        this.perimeter = 2 * (rectangle.width + rectangle.height);
        console.log(`Rectangle perimeter: ${this.perimeter.toFixed(2)}`);
    }

    visitTriangle(triangle: Triangle): void {
        this.perimeter = triangle.side1 + triangle.side2 + triangle.side3;
        console.log(`Triangle perimeter: ${this.perimeter.toFixed(2)}`);
    }
}

// Client
function clientVisitor() {
    const shapes: Shape[] = [
        new Circle(5),
        new Rectangle(4, 6),
        new Triangle(3, 4, 5)
    ];

    const areaCalculator = new AreaCalculator();
    const perimeterCalculator = new PerimeterCalculator();

    console.log("Calculating areas:");
    shapes.forEach(shape => shape.accept(areaCalculator));

    console.log("\nCalculating perimeters:");
    shapes.forEach(shape => shape.accept(perimeterCalculator));
}

// Demo
console.log("VISITOR PATTERN DEMO:");
clientVisitor();

/*
VISITOR PATTERN DEMO:
Calculating areas:
Circle area: 78.54
Rectangle area: 24.00
Triangle area: 6.00

Calculating perimeters:
Circle perimeter: 31.42
Rectangle perimeter: 20.00
Triangle perimeter: 12.00
*/


================================================
 Behavioral/visitor_2.ts
================================================
// Element Interface
interface ShoppingCartItem {
    accept(visitor: CartVisitor): void;
}

// Concrete Element: Book
class Book implements ShoppingCartItem {
    constructor(private price: number) { }

    accept(visitor: CartVisitor): void {
        visitor.visitBook(this);
    }

    getPrice(): number {
        return this.price;
    }
}

// Concrete Element: Electronic
class Electronic implements ShoppingCartItem {
    constructor(private price: number) { }

    accept(visitor: CartVisitor): void {
        visitor.visitElectronic(this);
    }

    getPrice(): number {
        return this.price;
    }
}

// Visitor Interface
interface CartVisitor {
    visitBook(book: Book): void;
    visitElectronic(electronic: Electronic): void;
}

// Concrete Visitor: Calculate Total Price
class CartPriceCalculator implements CartVisitor {
    totalPrice: number = 0;

    visitBook(book: Book): void {
        this.totalPrice += book.getPrice();
        console.log(`Book Price: $${book.getPrice()}`);
    }

    visitElectronic(electronic: Electronic): void {
        this.totalPrice += electronic.getPrice();
        console.log(`Electronic Price: $${electronic.getPrice()}`);
    }

    getTotal(): number {
        return this.totalPrice;
    }
}

// Usage
const book = new Book(15);
const electronic = new Electronic(100);

const cartItems: ShoppingCartItem[] = [book, electronic];

const cartPriceCalculator = new CartPriceCalculator();

cartItems.forEach(item => item.accept(cartPriceCalculator));

console.log(`Total Price: $${cartPriceCalculator.getTotal()}`);

// Book Price: $15
// Electronic Price: $100
// Total Price: $115



======================================================================
 # <a name="1-creational-patterns">Creational/abstract_factory.ts</a>
======================================================================
/*
The Abstract Factory pattern provides an interface for creating families of related or
dependent objects without specifying their concrete classes.

Pros:
Allows the creation of related objects in a consistent manner.
Promotes loose coupling and separation of concerns.

Cons:
Can lead to a large number of factory classes if the number of families (e.g., dog vs. cat) increases.

Real-World Example:
A GUI framework that allows users to choose different themes (light, dark, etc.), where
the Abstract Factory provides the components for the interface (buttons, text fields, etc.).
*/

class DogAF {
    speak(): void {
        console.log("Woof!");
    }
}

class CatAF {
    speak(): void {
        console.log("Meow!");
    }
}

class DogFood {
    prepare(): void {
        console.log("Preparing dog food.");
    }
}

class CatFood {
    prepare(): void {
        console.log("Preparing cat food");
    }
}

interface Animal {
    speak(): void
}

interface Food {
    prepare(): void
}

abstract class AnimalFactoryAF {
    abstract createAnimal(): Animal;
    abstract createFood(): Food;
}

class DogFactory extends AnimalFactoryAF {
    createAnimal(): Animal {
        return new DogAF();
    }
    createFood(): Food {
        return new DogFood();
    }
}

class CatFactory extends AnimalFactoryAF {
    createAnimal(): Animal {
        return new CatAF();
    }
    createFood(): Food {
        return new CatFood();
    }
}

const dogFactory = new DogFactory();
const dogAF: Animal = dogFactory.createAnimal();
dogAF.speak(); // Woof!
const dogFood: Food = dogFactory.createFood();
dogFood.prepare(); // Preparing dog food

const catFactory = new CatFactory();
const catAF: Animal = catFactory.createAnimal();
catAF.speak(); // Meow!
const catFood: Food = catFactory.createFood();
catFood.prepare(); // Preparing cat food


================================================
 # Creational/abstract_factory_second_example.ts
================================================
// Abstract product interfaces
interface Button {
    render(): string;
    onClick(): void;
}

interface Checkbox {
    render(): string;
    toggle(): void;
}

// Concrete product A1
class WindowsButton implements Button {
    render(): string {
        return '<button class="windows-btn">Windows Button</button>';
    }

    onClick(): void {
        console.log('Windows button clicked');
    }
}

// Concrete product B1
class WindowsCheckbox implements Checkbox {
    render(): string {
        return '<input type="checkbox" class="windows-checkbox">';
    }

    toggle(): void {
        console.log('Windows checkbox toggled');
    }
}

// Concrete product A2
class MacButton implements Button {
    render(): string {
        return '<button class="mac-btn">Mac Button</button>';
    }

    onClick(): void {
        console.log('Mac button clicked');
    }
}

// Concrete product B2
class MacCheckbox implements Checkbox {
    render(): string {
        return '<input type="checkbox" class="mac-checkbox">';
    }

    toggle(): void {
        console.log('Mac checkbox toggled');
    }
}

// Abstract factory interface
interface GUIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
}

// Concrete factory 1
class WindowsFactory implements GUIFactory {
    createButton(): Button {
        return new WindowsButton();
    }

    createCheckbox(): Checkbox {
        return new WindowsCheckbox();
    }
}

// Concrete factory 2
class MacFactory implements GUIFactory {
    createButton(): Button {
        return new MacButton();
    }

    createCheckbox(): Checkbox {
        return new MacCheckbox();
    }
}

// Client code
class Application {
    private factory: GUIFactory;
    private button: Button | null = null;
    private checkbox: Checkbox | null = null;

    constructor(factory: GUIFactory) {
        this.factory = factory;
    }

    createUI(): void {
        this.button = this.factory.createButton();
        this.checkbox = this.factory.createCheckbox();
    }

    render(): void {
        if (this.button && this.checkbox) {
            console.log(this.button.render());
            console.log(this.checkbox.render());
        }
    }
}

// Usage
const os = 'Windows'; // or 'Mac'
let factory3: GUIFactory;

if (os === 'Windows') {
    factory3 = new WindowsFactory();
} else {
    factory3 = new MacFactory();
}

const app = new Application(factory3);
app.createUI();
app.render();


================================================
 # Creational/builder.ts
================================================
/*
The Builder pattern separates the construction of a complex object from its representation
so that the same construction process can create different representations.

Pros:
Provides a flexible way to construct complex objects step by step.
Keeps the object construction code isolated from the client.

Cons:
Can become overly complex if the product has too many features or attributes.

Real-World Example:
Building a complex object like a meal with various courses (starter, main dish, dessert),
where you can customize the meal's components.
*/

class Car {
    constructor(public engine: string, public wheels: number, public colour: string) { }

    display(): void {
        console.log(`Car with ${this.engine} engine, ${this.wheels} wheels, and ${this.colour} colour`);
    }
}

class CarBuilder {
    private engine: string = "";
    private wheels: number = 0;
    private colour: string = "";

    setEngine(engine: string): CarBuilder {
        this.engine = engine;
        return this;
    }

    setWheels(wheels: number): CarBuilder {
        this.wheels = wheels;
        return this;
    }

    setColor(colour: string): CarBuilder {
        this.colour = colour;
        return this;
    }

    build(): Car {
        return new Car(this.engine, this.wheels, this.colour);
    }
}

const car: Car = new CarBuilder()
    .setEngine("v12")
    .setWheels(4)
    .setColor("Red")
    .build()

car.display(); // Car with V12 engine, 4 wheels, and Red colour


================================================
 # Creational/builder_second_example.ts
================================================
class Pizza {
    toppings: string[] = [];
    size: string = '';
    crustType: string = '';
    sauce: string = '';
    extraCheese: boolean = false;

    describe(): string {
        return `A ${this.size} pizza with ${this.crustType} crust, ${this.sauce} sauce, ${this.toppings.join(', ')} toppings${this.extraCheese ? ' and extra cheese' : ''}.`;
    }
}

class PizzaBuilder {
    private pizza: Pizza = new Pizza();

    setSize(size: string): PizzaBuilder {
        this.pizza.size = size;
        return this;
    }

    setCrustType(crustType: string): PizzaBuilder {
        this.pizza.crustType = crustType;
        return this;
    }

    setSauce(sauce: string): PizzaBuilder {
        this.pizza.sauce = sauce;
        return this;
    }

    addTopping(topping: string): PizzaBuilder {
        this.pizza.toppings.push(topping);
        return this;
    }

    addExtraCheese(): PizzaBuilder {
        this.pizza.extraCheese = true;
        return this;
    }

    build(): Pizza {
        return this.pizza;
    }
}

class PizzaDirector {
    constructPepperoniPizza(builder: PizzaBuilder): Pizza {
        return builder
            .setSize('medium')
            .setCrustType('regular')
            .setSauce('tomato')
            .addTopping('pepperoni')
            .build();
    }

    constructVegetarianPizza(builder: PizzaBuilder): Pizza {
        return builder
            .setSize('large')
            .setCrustType('thin')
            .setSauce('tomato')
            .addTopping('mushrooms')
            .addTopping('peppers')
            .addTopping('onions')
            .build();
    }
}

// Usage
const customPizza = new PizzaBuilder()
  .setSize('large')
  .setCrustType('thin')
  .setSauce('tomato')
  .addTopping('pepperoni')
  .addTopping('mushrooms')
  .addExtraCheese()
  .build();

console.log(customPizza.describe());

// Using the director
const director = new PizzaDirector();
const pepperoniPizza = director.constructPepperoniPizza(new PizzaBuilder());
console.log(pepperoniPizza.describe());


================================================
 # Creational/factory_method.ts
================================================
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


================================================
 # Creational/factory_method_second_example.ts
================================================
interface Vehicle {
    brand: string;
    model: string;
    getInfo(): string;
}

class CarFM implements Vehicle {
    brand: string;
    model: string;
    doors: number;

    constructor(brand: string, model: string, doors: number) {
        this.brand = brand;
        this.model = model;
        this.doors = doors;
    }

    getInfo(): string {
        return `${this.brand} ${this.model}, ${this.doors} doors car`;
    }
}

class Motorcycle implements Vehicle {
    brand: string;
    model: string;
    hasABS: boolean;

    constructor(brand: string, model: string, hasABS: boolean) {
        this.brand = brand;
        this.model = model;
        this.hasABS = hasABS;
    }

    getInfo(): string {
        return `${this.brand} ${this.model}, motorcycle with${this.hasABS ? '' : 'out'} ABS`;
    }
}

// Factory
type VehicleType = 'car' | 'motorcycle';
type VehicleOption = number | boolean;

class VehicleFactory2 {
    createVehicle(type: VehicleType, brand: string, model: string, option: VehicleOption): Vehicle {
        switch (type) {
            case 'car':
                return new CarFM(brand, model, option as number);
            case 'motorcycle':
                return new Motorcycle(brand, model, option as boolean);
            default:
                throw new Error(`Vehicle type ${type} not supported.`);
        }
    }
}

// Usage
const factory2 = new VehicleFactory2();
const toyota = factory2.createVehicle('car', 'Toyota', 'Corolla', 4);
const honda = factory2.createVehicle('motorcycle', 'Honda', 'CBR', true);

console.log(toyota.getInfo()); // Toyota Corolla, 4 doors car
console.log(honda.getInfo()); // Honda CBR, motorcycle with ABS


================================================
 # Creational/prototype.ts
================================================
/**
 * The Prototype pattern is used to create duplicate objects while keeping performance in mind.
 * It involves creating a copy of an existing object rather than creating new ones.
 * 
 * Pros:
 * Efficient when creating new objects that are identical to an existing object.
 * Reduces the need to create new objects from scratch.
 *
 * Cons:
 * Can be difficult to manage if the cloned objects have complex states.
 *
 * Real-World Example:
 * In graphical design software, objects like shapes (circle, rectangle, etc.) can be cloned to create
 * identical or modified versions without creating them from scratch every time.
 */

class CarP {
    constructor(public engine: string, public wheels: number, public colour: string) {
        this.engine = engine;
        this.wheels = wheels;
        this.colour = colour;
    }

    clone(): CarP {
        return new CarP(this.engine, this.wheels, this.colour)
    }

    display(): void {
        console.log(`Car with ${this.engine} engine, ${this.wheels} wheels, and ${this.colour} colour`);
    }
}

const car1: CarP = new CarP("V8",4,"Red");
const car2: CarP = car1.clone();
car2.display(); // Car with V8 engine, 4 wheels, and Red colour
car2.engine = "V12";
car2.colour = "Yellow";
car2.display(); // Car with V12 engine, 4 wheels, and Yellow colour


================================================
 # Creational/singleton.ts
================================================
/*
The Singleton pattern ensures a class has only one instance and provides a global point
of access to that instance.

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




================================================
 Structural/adapter.ts
================================================
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


================================================
 Structural/adapter_second_example.ts
================================================
// Target interface
interface Target {
    request(): string;
}

// The client expects all objects to use this interface
class Adaptee {
    public specificRequest(): string {
        return 'Specific request implementation';
    }
}

// Adapter makes Adaptee compatible with Target
class Adapter implements Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        this.adaptee = adaptee;
    }

    public request(): string {
        const result = this.adaptee.specificRequest();
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

// Client code
function clientCode(target: Target) {
    console.log(target.request());
}

// Usage
console.log('Client: I can work with Target objects:');
const target = {
    request: () => 'Target: The default target\'s behavior.'
};
clientCode(target);

console.log('Client: I need to use an Adaptee, but it has an incompatible interface:');
const adaptee = new Adaptee();
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('Client: With the Adapter, I can use the Adaptee:');
const adapter = new Adapter(adaptee);
clientCode(adapter);


================================================
 Structural/adapter_third_example.ts
================================================
// Old interface
interface IOldCalculator {
    operate(a: number, b: number, operation: string): number;
}

// New interface
interface INewCalculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
}

class OldCalculator implements IOldCalculator {
    operate(a: number, b: number, operation: string): number {
        switch (operation) {
            case 'add':
                return a + b;
            case 'sub':
                return a - b;
            default:
                return NaN;
        }
    }
}

class NewCalculator implements INewCalculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        return a / b;
    }
}

// Adapter
class CalculatorAdapter implements IOldCalculator {
    private newCalculator: INewCalculator;

    constructor() {
        this.newCalculator = new NewCalculator();
    }

    operate(a: number, b: number, operation: string): number {
        switch (operation) {
            case 'add':
                return this.newCalculator.add(a, b);
            case 'sub':
                return this.newCalculator.subtract(a, b);
            case 'mult':
                return this.newCalculator.multiply(a, b);
            case 'div':
                return this.newCalculator.divide(a, b);
            default:
                return NaN;
        }
    }
}

// Usage
const oldCalc = new OldCalculator();
console.log(oldCalc.operate(10, 5, 'add')); // 15

const newCalc = new NewCalculator();
console.log(newCalc.add(10, 5)); // 15

const adaptedCalc = new CalculatorAdapter();
console.log(adaptedCalc.operate(10, 5, 'add')); // 15
console.log(adaptedCalc.operate(10, 5, 'mult')); // 50


================================================
 Structural/bridge.ts
================================================
/**
 * Decouples an abstraction from its implementation so that the two can vary independently.
 * 
 * Purpose: Decouple abstraction from implementation.
 * 
 * Use When:
 * You need to run multiple variations of an abstraction and implementation.
 * You want to avoid a complex inheritance hierarchy.
 * 
 * How it works:
 * Separate abstraction and implementation into different class hierarchies and link them with a bridge.
 * 
 * Real-life:
 * Database drivers for different DBs using a unified interface.
 * 
 * Pros:
 * Independent evolution of abstraction and implementation.
 * 
 * Cons:
 * Adds complexity.
 */

interface Renderer {
    renderCircle(radius: number): void;
}

class SVGRenderer implements Renderer {
    renderCircle(radius: number): void {
        console.log(`Rendering SVG circle with radius ${radius}`);
    }
}

class CanvasRenderer implements Renderer {
    renderCircle(radius: number) {
        console.log(`Rendering Canvas circle with radius ${radius}`);
    }
}

class Circle {
    constructor(private renderer: Renderer, private radius: number) {}

    draw() {
        this.renderer.renderCircle(this.radius);
    }
}

const circle = new Circle(new CanvasRenderer(), 10);
circle.draw(); // Rendering Canvas circle with radius 10

const circle2 = new Circle(new SVGRenderer(), 5);
circle2.draw(); // Rendering SVG circle with radius 5


================================================
 Structural/bridge_second_example.ts
================================================
// Implementation interface
interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}

// Concrete implementation A
class TV implements Device {
    private enabled: boolean = false;
    private volume: number = 30;
    private channel: number = 1;

    isEnabled(): boolean {
        return this.enabled;
    }

    enable(): void {
        this.enabled = true;
    }

    disable(): void {
        this.enabled = false;
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        if (percent > 100) {
            this.volume = 100;
        } else if (percent < 0) {
            this.volume = 0;
        } else {
            this.volume = percent;
        }
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
    }
}

// Concrete implementation B
class Radio implements Device {
    private enabled: boolean = false;
    private volume: number = 20;
    private channel: number = 95.5;

    isEnabled(): boolean {
        return this.enabled;
    }

    enable(): void {
        this.enabled = true;
    }

    disable(): void {
        this.enabled = false;
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        if (percent > 100) {
            this.volume = 100;
        } else if (percent < 0) {
            this.volume = 0;
        } else {
            this.volume = percent;
        }
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
    }
}

// Abstraction
class RemoteControl {
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    togglePower(): void {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    volumeDown(): void {
        this.device.setVolume(this.device.getVolume() - 10);
    }

    volumeUp(): void {
        this.device.setVolume(this.device.getVolume() + 10);
    }

    channelDown(): void {
        this.device.setChannel(this.device.getChannel() - 1);
    }

    channelUp(): void {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}

// Extended abstraction
class AdvancedRemoteControl extends RemoteControl {
    mute(): void {
        this.device.setVolume(0);
    }
}

// Usage
const tv = new TV();
const remote = new RemoteControl(tv);

remote.togglePower();
console.log(tv.isEnabled()); // true

remote.volumeUp();
console.log(tv.getVolume()); // 40

const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);

advancedRemote.togglePower();
console.log(radio.isEnabled()); // true

advancedRemote.mute();
console.log(radio.getVolume()); // 0


================================================
 Structural/composite.ts
================================================
/**
 * Treat individual objects and compositions of objects uniformly.
 * 
 * Purpose: Compose objects into tree structures.
 * 
 * Use When:
 * You want to represent part-whole hierarchies (e.g., file systems, menus).
 * You want to treat groups and individual elements the same way.
 * 
 * How it works:
 * Create a tree structure where both leaf nodes and composite nodes implement the same interface.
 * 
 * Real-life:
 * DOM nodes (div, span) with children.
 * File system (folders & files).
 * 
 * Pros:
 * Uniform treatment of components and composites.
 * 
 * Cons:
 * Overgeneralization.
 */

// Component
interface Component {
    name: string;
    display(indent?: number): void;
    getSize(): number;
  }
  
  // Leaf
  class MyFile implements Component {
    name: string;
    private size: number;
    
    constructor(name: string, size: number) {
      this.name = name;
      this.size = size;
    }
    
    display(indent: number = 0): void {
      console.log(`${'  '.repeat(indent)}${this.name} (${this.size} KB)`);
    }
    
    getSize(): number {
      return this.size;
    }
  }
  
  // Composite
  class Directory implements Component {
    name: string;
    private children: Component[];
    
    constructor(name: string) {
      this.name = name;
      this.children = [];
    }
    
    add(component: Component): Directory {
      this.children.push(component);
      return this;
    }
    
    remove(component: Component): void {
      const index = this.children.indexOf(component);
      if (index !== -1) {
        this.children.splice(index, 1);
      }
    }
    
    display(indent: number = 0): void {
      console.log(`${'  '.repeat(indent)}${this.name} (${this.getSize()} KB)`);
      
      for (const child of this.children) {
        child.display(indent + 1);
      }
    }
    
    getSize(): number {
      return this.children.reduce((total, child) => total + child.getSize(), 0);
    }
  }
  
  // Usage
  const root = new Directory('root');
  const music = new Directory('Music');
  const pictures = new Directory('Pictures');
  const file1 = new MyFile('track1.mp3', 4000);
  const file2 = new MyFile('track2.mp3', 5000);
  const file3 = new MyFile('picture1.jpg', 2000);
  const file4 = new MyFile('picture2.jpg', 3000);
  
  root.add(music).add(pictures);
  music.add(file1).add(file2);
  pictures.add(file3).add(file4);
  
  root.display();


================================================
 Structural/decorator.ts
================================================
/**
 * Attach new behaviors to objects at runtime without modifying their structure.
 * 
 * Purpose: Dynamically add new behavior to objects without altering their structure.
 * 
 * Use When:
 * You want to add responsibilities dynamically.
 * Subclassing would lead to an explosion of classes.
 * 
 * How it works:
 * Wrap the original object with a new object that adds behavior.
 * 
 * Real-life:
 * Middleware in Express.js.
 * React Higher-Order Components (HOCs).
 * 
 * Pros:
 * Adds behavior without modifying the original class.
 * Follows the Open/Closed principle.
 * 
 * Cons:
 * Can become hard to manage with many layers.
 */

interface Coffee {
    getCost(): number;
    getDescription(): string;
}

class SimpleCoffee implements Coffee {
    getCost(): number {
        return 5;
    }

    getDescription(): string {
        return "Simple Coffee";
    }
}

abstract class CoffeeDecorator implements Coffee {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    getCost(): number {
        return this.coffee.getCost();
    }

    getDescription(): string {
        return this.coffee.getDescription();
    }
}

class MilkDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    getCost(): number {
        return this.coffee.getCost() + 2;
    }

    getDescription(): string {
        return `${this.coffee.getDescription()}, with milk`;
    }
}

class WhipDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    getCost(): number {
        return this.coffee.getCost() + 3;
    }

    getDescription(): string {
        return `${this.coffee.getDescription()}, with whip`;
    }
}

class VanillaDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    getCost(): number {
        return this.coffee.getCost() + 1.5;
    }

    getDescription(): string {
        return `${this.coffee.getDescription()}, with vanilla`;
    }
}

// Usage
let myCoffee: Coffee = new SimpleCoffee();
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);
// Simple Coffee costs $5

myCoffee = new MilkDecorator(myCoffee);
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);
// Simple Coffee, with milk costs $7

myCoffee = new WhipDecorator(myCoffee);
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);
// Simple Coffee, with milk, with whip costs $10

myCoffee = new VanillaDecorator(myCoffee);
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);
// Simple Coffee, with milk, with whip, with vanilla costs $11.5


================================================
 Structural/facade.ts
================================================
/**
 * Provides a simplified interface to a larger body of code (e.g., a library or complex subsystem).
 * 
 * Purpose: Provide a simplified interface to a complex subsystem.
 * 
 * Use When:
 * You want to hide a complex subsystem behind a simpler interface.
 * You want to make a library or API easier to use.
 * 
 * How it works:
 * A facade class wraps the subsystem and provides higher-level methods.
 * 
 * Real-life:
 * jQuery abstracts complex DOM APIs.
 * A UI button that hides multiple services.
 * 
 * Pros:
 * Simplifies usage of complex APIs.
 * Reduces dependencies.
 * 
 * Cons:
 * May limit flexibility.
 * Can become god object.
 */

class AudioPlayer {
    turnOn(): void {
        console.log("Audio player turned on");
    }

    turnOff(): void {
        console.log("Audio player turned off");
    }

    play(track: string): void {
        console.log(`Playing '${track}'`);
    }
}

class Display {
    turnOn(): void {
        console.log("Display turned on");
    }

    turnOff(): void {
        console.log("Display turned off");
    }

    setSource(source: string): void {
        console.log(`Display source set to ${source}`);
    }
}

class Amplifier {
    turnOn(): void {
        console.log("Amplifier turned on");
    }

    turnOff(): void {
        console.log("Amplifier turned off");
    }

    setVolume(level: number): void {
        console.log(`Amplifier volume set to ${level}`);
    }
}

class Lights {
    dim(level: number): void {
        console.log(`Lights dimmed to ${level}%`);
    }

    brighten(): void {
        console.log("Lights brightened to 100%");
    }
}

// Facade
class HomeTheaterFacade {
    private audioPlayer: AudioPlayer;
    private display: Display;
    private amplifier: Amplifier;
    private lights: Lights;

    constructor() {
        this.audioPlayer = new AudioPlayer();
        this.display = new Display();
        this.amplifier = new Amplifier();
        this.lights = new Lights();
    }

    watchMovie(movie: string): void {
        console.log("Get ready to watch a movie...");
        this.lights.dim(30);
        this.display.turnOn();
        this.display.setSource("HDMI 1");
        this.amplifier.turnOn();
        this.amplifier.setVolume(20);
        this.audioPlayer.turnOn();
        this.audioPlayer.play(movie);
        console.log(`Now playing: ${movie}`);
    }

    endMovie(): void {
        console.log("Shutting down the home theater...");
        this.audioPlayer.turnOff();
        this.amplifier.turnOff();
        this.display.turnOff();
        this.lights.brighten();
        console.log("Home theater shutdown complete");
    }
}

// Usage
const homeTheater = new HomeTheaterFacade();
homeTheater.watchMovie("Inception");
console.log("...");
homeTheater.endMovie();

/*
Get ready to watch a movie...
Lights dimmed to 30%
Display turned on
Display source set to HDMI 1
Amplifier turned on
Amplifier volume set to 20
Audio player turned on
Playing 'Inception'
Now playing: Inception
...
Shutting down the home theater...
Audio player turned off
Amplifier turned off
Display turned off
Lights brightened to 100%
Home theater shutdown complete
*/


================================================
 Structural/flyweight.ts
================================================
/**
 * Share objects to support large numbers of similar objects efficiently.
 * 
 * Purpose: Share common data to reduce memory usage when many similar objects are used.
 * 
 * Use When:
 * You have many similar objects that use too much memory.
 * Object creation is costly and many instances share state.
 * 
 * How it works:
 * Separate intrinsic (shared) state from extrinsic (unique) state.
 * Reuse shared objects.
 * 
 * Real-life:
 * Text editors: characters share font metadata.
 * Game objects like trees or bullets.
 * 
 * Pros:
 * Memory efficiency.
 * Faster performance with many objects.
 * 
 * Cons:
 * Complex to implement.
 * Difficult debugging.
 */

class TreeType {
    constructor(public name: string, public colour: string) { }

    draw(x: number, y: number) {
        console.log(`Drawing ${this.name} tree in ${this.colour} at (${x}, ${y})`);
    }
}

class TreeFactory {
    private types: Record<string, TreeType> = {};

    getTreeType(name: string, colour: string): TreeType {
        const key = `${name}_${colour}`;
        if (!this.types[key]) {
            this.types[key] = new TreeType(name, colour);
        }
        return this.types[key];
    }
}

const factory = new TreeFactory();
factory.getTreeType("Pine", "Dark Green").draw(5, 5); // Drawing Pine tree in Dark Green at (5, 5)
factory.getTreeType("Pine", "Dark Green").draw(10, 10); // Drawing Pine tree in Dark Green at (10, 10) - Same instance reused
factory.getTreeType("Oak", "Dark Brown").draw(2, 6);


================================================
 Structural/flyweight_second_example.ts
================================================
// Flyweight
class Character {
    private char: string;

    constructor(char: string) {
        this.char = char;
        // Imagine this consumes a lot of memory
        console.log(`Character ${char} created`);
    }

    render(font: string, size: number, position: Position): void {
        console.log(`Character ${this.char} rendered with font ${font} at size ${size} in position (${position.x}, ${position.y})`);
    }
}

// Position (extrinsic state)
interface Position {
    x: number;
    y: number;
}

// Flyweight Factory
class CharacterFactory {
    private characters: { [key: string]: Character } = {};

    getCharacter(char: string): Character {
        // If character doesn't exist, create it
        if (!this.characters[char]) {
            this.characters[char] = new Character(char);
        }
        return this.characters[char];
    }

    getCount(): number {
        return Object.keys(this.characters).length;
    }
}

// Context
class TextEditor {
    private factory: CharacterFactory;
    private characters: Character[] = [];
    private positions: Position[] = [];

    constructor() {
        this.factory = new CharacterFactory();
    }

    write(text: string, font: string, size: number): void {
        for (let i = 0; i < text.length; i++) {
            const char = this.factory.getCharacter(text[i]);
            const position: Position = { x: i * 10, y: 20 };

            this.characters.push(char);
            this.positions.push(position);
        }
    }

    render(): void {
        for (let i = 0; i < this.characters.length; i++) {
            this.characters[i].render('Arial', 12, this.positions[i]);
        }
    }

    getCharacterCount(): number {
        return this.factory.getCount();
    }
}

// Usage
const editor = new TextEditor();
editor.write("Hello Flyweight Pattern", "Arial", 12);
console.log(`Character objects created: ${editor.getCharacterCount()}`);
editor.render();

/*
Character H created
Character e created
Character l created
Character o created
Character   created
Character F created
Character y created
Character w created
Character i created
Character g created
Character h created
Character t created
Character P created
Character a created
Character r created
Character n created
Character objects created: 16
Character H rendered with font Arial at size 12 in position (0, 20)
Character e rendered with font Arial at size 12 in position (10, 20)
Character l rendered with font Arial at size 12 in position (20, 20)
Character l rendered with font Arial at size 12 in position (30, 20)
Character o rendered with font Arial at size 12 in position (40, 20)
Character   rendered with font Arial at size 12 in position (50, 20)
Character F rendered with font Arial at size 12 in position (60, 20)
Character l rendered with font Arial at size 12 in position (70, 20)
Character y rendered with font Arial at size 12 in position (80, 20)
Character w rendered with font Arial at size 12 in position (90, 20)
Character e rendered with font Arial at size 12 in position (100, 20)
Character i rendered with font Arial at size 12 in position (110, 20)
Character g rendered with font Arial at size 12 in position (120, 20)
Character h rendered with font Arial at size 12 in position (130, 20)
Character t rendered with font Arial at size 12 in position (140, 20)
Character   rendered with font Arial at size 12 in position (150, 20)
Character P rendered with font Arial at size 12 in position (160, 20)
Character a rendered with font Arial at size 12 in position (170, 20)
Character t rendered with font Arial at size 12 in position (180, 20)
Character t rendered with font Arial at size 12 in position (190, 20)
Character e rendered with font Arial at size 12 in position (200, 20)
Character r rendered with font Arial at size 12 in position (210, 20)
Character n rendered with font Arial at size 12 in position (220, 20)
*/


================================================
 Structural/proxy.ts
================================================
/**
 * Provide a placeholder or surrogate to control access to another object.
 * 
 * Purpose: Provide a placeholder to control access to another object.
 * 
 * Use When:
 * You want to control access (e.g., lazy loading, logging, access control).
 * You want to add functionality without modifying the actual object.
 * 
 * How it works:
 * The proxy implements the same interface and forwards requests to the real object, optionally adding behavior.
 * 
 * Real-life:
 * API Gateways.
 * Virtual proxies (e.g. image loading preview).
 * Auth guards in web apps.
 * 
 * Pros:
 * Adds control (access, logging, caching).
 * Useful in lazy loading.
 * 
 * Cons:
 * Adds overhead.
 * More boilerplate.
 */

class RealAPI {
    request(): void {
        console.log("Fetching real data...");
    }
}

class APIProxy {
    private api = new RealAPI();

    request(user: string): void {
        if (user === "admin") {
            this.api.request();
        } else {
            console.log("Access denied.");
        }
    }
}

const proxy = new APIProxy();
proxy.request("admin"); // Fetching real data...
proxy.request("guest"); // Access denied.



================================================
 Structural/proxy_second_example.ts
================================================
interface IImage {
    display(): void;
}

class RealImage implements IImage {
    constructor(private filename: string) {
        this.loadFromDisk();
    }

    private loadFromDisk(): void {
        console.log(`Loading ${this.filename}`);
    }

    public display(): void {
        console.log(`Displaying ${this.filename}`);
    }
}

class ProxyImage implements IImage {
    private realImage: RealImage | null = null;

    constructor(private filename: string) { }

    public display(): void {
        if (!this.realImage) {
            this.realImage = new RealImage(this.filename);
        }
        this.realImage.display();
    }
}

// Usage
const image: IImage = new ProxyImage("pic.jpg");
image.display(); // Loads and displays
image.display(); // Only displays

// Loading pic.jpg
// Displaying pic.jpg
// Displaying pic.jpg


================================================
 Structural/proxy_third_example.ts
================================================
// 1. Subject Interface
interface Internet {
    connectTo(serverHost: string): void;
}

// 2. Real Subject
class RealInternet implements Internet {
    connectTo(serverHost: string): void {
        console.log(`Connected to ${serverHost}`);
    }
}

// 3. Protection Proxy
class ProtectionProxy implements Internet {
    private realInternet: RealInternet;
    private bannedSites: string[] = ['facebook.com', 'instagram.com', 'twitter.com'];

    constructor() {
        this.realInternet = new RealInternet();
    }

    connectTo(serverHost: string): void {
        if (this.bannedSites.includes(serverHost)) {
            throw new Error(`Access to ${serverHost} is denied`);
        }

        console.log(`Protection proxy checking request to ${serverHost}`);
        this.realInternet.connectTo(serverHost);
    }
}

// 4. Virtual Proxy (Lazy Initialization)
class VirtualProxy implements Internet {
    private realInternet: RealInternet | null = null;

    connectTo(serverHost: string): void {
        console.log("Virtual Proxy: Lazy initialization of real subject");

        if (this.realInternet === null) {
            console.log("Creating RealInternet instance on first use");
            this.realInternet = new RealInternet();
        }

        this.realInternet.connectTo(serverHost);
    }
}

// 5. Logging Proxy
class LoggingProxy implements Internet {
    private realInternet: RealInternet;

    constructor() {
        this.realInternet = new RealInternet();
    }

    connectTo(serverHost: string): void {
        console.log(`Logging: Attempt to connect to ${serverHost} at ${new Date().toISOString()}`);

        try {
            this.realInternet.connectTo(serverHost);
            console.log(`Logging: Successfully connected to ${serverHost}`);
        } catch (error) {
            console.log(`Logging: Failed to connect to ${serverHost}`);
            throw error;
        }
    }
}

// 6. Cache Proxy
class CacheProxy implements Internet {
    private realInternet: RealInternet;
    private cache: Set<string> = new Set<string>();

    constructor() {
        this.realInternet = new RealInternet();
    }

    connectTo(serverHost: string): void {
        if (this.cache.has(serverHost)) {
            console.log(`Cache hit: Retrieving ${serverHost} from cache`);
            return;
        }

        console.log(`Cache miss: ${serverHost} not in cache`);
        this.realInternet.connectTo(serverHost);

        // Cache the result
        this.cache.add(serverHost);
        console.log(`Added ${serverHost} to cache`);
    }
}

// 7. Proxy Chain - combining multiple proxies
class ProxyChain implements Internet {
    private internet: Internet;

    constructor() {
        // Create a chain of proxies
        // The flow will be: Request -> Cache -> Logging -> Protection -> RealInternet
        const realInternet = new RealInternet();
        const protectionProxy = new CustomProtectionProxy(realInternet);
        const loggingProxy = new CustomLoggingProxy(protectionProxy);
        const cacheProxy = new CustomCacheProxy(loggingProxy);

        this.internet = cacheProxy;
    }

    connectTo(serverHost: string): void {
        console.log("Starting proxy chain");
        this.internet.connectTo(serverHost);
        console.log("Proxy chain complete");
    }
}

// Custom proxy classes for chaining
class CustomProtectionProxy implements Internet {
    private bannedSites: string[] = ['facebook.com', 'instagram.com', 'twitter.com'];

    constructor(private internet: Internet) { }

    connectTo(serverHost: string): void {
        if (this.bannedSites.includes(serverHost)) {
            throw new Error(`Access to ${serverHost} is denied`);
        }

        console.log(`Protection proxy checking request to ${serverHost}`);
        this.internet.connectTo(serverHost);
    }
}

class CustomLoggingProxy implements Internet {
    constructor(private internet: Internet) { }

    connectTo(serverHost: string): void {
        console.log(`Logging: Attempt to connect to ${serverHost} at ${new Date().toISOString()}`);

        try {
            this.internet.connectTo(serverHost);
            console.log(`Logging: Successfully connected to ${serverHost}`);
        } catch (error) {
            console.log(`Logging: Failed to connect to ${serverHost}`);
            throw error;
        }
    }
}

class CustomCacheProxy implements Internet {
    private cache: Set<string> = new Set<string>();

    constructor(private internet: Internet) { }

    connectTo(serverHost: string): void {
        if (this.cache.has(serverHost)) {
            console.log(`Cache hit: Retrieving ${serverHost} from cache`);
            return;
        }

        console.log(`Cache miss: ${serverHost} not in cache`);
        this.internet.connectTo(serverHost);

        // Cache the result
        this.cache.add(serverHost);
        console.log(`Added ${serverHost} to cache`);
    }
}

// Usage examples
console.log("=== Protection Proxy Example ===");
const protectionProxy = new ProtectionProxy();
try {
    protectionProxy.connectTo('geeksforgeeks.org');
    protectionProxy.connectTo('facebook.com'); // This will be blocked
} catch (e) {
    console.log((e as Error).message);
}

// Virtual Proxy
console.log("\n=== Virtual Proxy Example ===");
const virtualProxy = new VirtualProxy();
virtualProxy.connectTo('google.com'); // First time creates the real subject
virtualProxy.connectTo('microsoft.com'); // Uses already created real subject

// Logging Proxy
console.log("\n=== Logging Proxy Example ===");
const loggingProxy = new LoggingProxy();
loggingProxy.connectTo('github.com');

// Cache Proxy
console.log("\n=== Cache Proxy Example ===");
const cacheProxy = new CacheProxy();
cacheProxy.connectTo('stackoverflow.com'); // Cache miss
cacheProxy.connectTo('stackoverflow.com'); // Cache hit
cacheProxy.connectTo('medium.com'); // Cache miss

// Proxy Chain Example
console.log("\n=== Proxy Chain Example ===");
const proxyChain = new ProxyChain();
try {
    proxyChain.connectTo('nodejs.org');
    proxyChain.connectTo('nodejs.org'); // Should hit cache
    proxyChain.connectTo('facebook.com'); // Should be blocked by protection proxy
} catch (e) {
    console.log((e as Error).message);
}

/*
=== Protection Proxy Example ===
Protection proxy checking request to geeksforgeeks.org
Connected to geeksforgeeks.org
Access to facebook.com is denied

=== Virtual Proxy Example ===
Virtual Proxy: Lazy initialization of real subject
Creating RealInternet instance on first use
Connected to google.com
Virtual Proxy: Lazy initialization of real subject
Connected to microsoft.com

=== Logging Proxy Example ===
Logging: Attempt to connect to github.com at 2025-05-01T10:50:32.535Z
Connected to github.com
Logging: Successfully connected to github.com

=== Cache Proxy Example ===
Cache miss: stackoverflow.com not in cache
Connected to stackoverflow.com
Added stackoverflow.com to cache
Cache hit: Retrieving stackoverflow.com from cache
Cache miss: medium.com not in cache
Connected to medium.com
Added medium.com to cache

=== Proxy Chain Example ===
Starting proxy chain
Cache miss: nodejs.org not in cache
Logging: Attempt to connect to nodejs.org at 2025-05-01T10:50:32.542Z
Protection proxy checking request to nodejs.org
Connected to nodejs.org
Logging: Successfully connected to nodejs.org
Added nodejs.org to cache
Proxy chain complete
Starting proxy chain
Cache hit: Retrieving nodejs.org from cache
Proxy chain complete
Starting proxy chain
Cache miss: facebook.com not in cache
Logging: Attempt to connect to facebook.com at 2025-05-01T10:50:32.546Z
Logging: Failed to connect to facebook.com
Access to facebook.com is denied
*/
