"use strict";
// COMMAND PATTERN
// The Command pattern encapsulates a request as an object, allowing parameterization of clients
// with different requests, queuing of requests, and logging of the operations.
// Receiver
class Light {
    constructor() {
        this.isOn = false;
    }
    turnOn() {
        this.isOn = true;
        console.log("Light is now ON");
    }
    turnOff() {
        this.isOn = false;
        console.log("Light is now OFF");
    }
}
// Concrete command implementations
class LightOnCommand {
    constructor(light) {
        this.light = light;
    }
    execute() {
        this.light.turnOn();
    }
    undo() {
        this.light.turnOff();
    }
}
class LightOffCommand {
    constructor(light) {
        this.light = light;
    }
    execute() {
        this.light.turnOff();
    }
    undo() {
        this.light.turnOn();
    }
}
// Invoker
class RemoteControl {
    constructor() {
        this.commands = [];
        this.undoStack = [];
    }
    addCommand(command) {
        this.commands.push(command);
    }
    executeCommand(index) {
        if (index >= 0 && index < this.commands.length) {
            this.commands[index].execute();
            this.undoStack.push(this.commands[index]);
        }
    }
    undo() {
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
    remote.addCommand(lightOn); // Button 0
    remote.addCommand(lightOff); // Button 1
    console.log("Pressing button 0:");
    remote.executeCommand(0); // Turn on
    console.log("Pressing button 1:");
    remote.executeCommand(1); // Turn off
    console.log("Undo last command:");
    remote.undo(); // Undo (turns on)
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
