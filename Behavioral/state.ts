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