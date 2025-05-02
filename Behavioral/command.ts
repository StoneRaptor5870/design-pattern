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