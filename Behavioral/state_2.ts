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
