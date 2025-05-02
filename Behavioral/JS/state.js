"use strict";
// STATE PATTERN
// The State pattern allows an object to alter its behavior when its internal state changes,
// appearing as if the object changed its class.
// Context
class VendingMachine {
    constructor(count) {
        this.count = 0;
        this.noMoneyState = new NoMoneyState();
        this.hasMoneyState = new HasMoneyState();
        this.soldState = new SoldState();
        this.soldOutState = new SoldOutState();
        this.count = count;
        this.state = count > 0 ? this.noMoneyState : this.soldOutState;
    }
    insertMoney() {
        this.state.handle(this);
    }
    setState(state) {
        this.state = state;
        console.log(`Vending machine is now in ${this.state.toString()} state`);
    }
    ejectMoney() {
        console.log("Money returned");
        this.setState(this.noMoneyState);
    }
    dispense() {
        console.log("Item dispensed");
        this.count--;
        this.setState(this.count > 0 ? this.noMoneyState : this.soldOutState);
    }
    getHasMoneyState() {
        return this.hasMoneyState;
    }
    getNoMoneyState() {
        return this.noMoneyState;
    }
    getSoldState() {
        return this.soldState;
    }
    getSoldOutState() {
        return this.soldOutState;
    }
    getCount() {
        return this.count;
    }
}
class NoMoneyState {
    handle(context) {
        console.log("You inserted money");
        context.setState(context.getHasMoneyState());
    }
    toString() {
        return "no money";
    }
}
class HasMoneyState {
    handle(context) {
        console.log("You turned the knob");
        context.setState(context.getSoldState());
    }
    toString() {
        return "has money";
    }
}
class SoldState {
    handle(context) {
        context.dispense();
    }
    toString() {
        return "sold";
    }
}
class SoldOutState {
    handle(context) {
        console.log("The machine is sold out");
    }
    toString() {
        return "sold out";
    }
}
// Client code
function clientState() {
    const vendingMachine = new VendingMachine(2);
    console.log("First purchase:");
    vendingMachine.insertMoney(); // Inserts money
    vendingMachine.insertMoney(); // Turns knob (using same method for simplicity)
    console.log("\nSecond purchase:");
    vendingMachine.insertMoney(); // Inserts money
    vendingMachine.insertMoney(); // Turns knob
    console.log("\nTrying to purchase when sold out:");
    vendingMachine.insertMoney(); // Attempts to insert money when sold out
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
