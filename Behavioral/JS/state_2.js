"use strict";
// Concrete States
class GreenLight {
    handle() {
        console.log("Green Light → Go!");
    }
}
class YellowLight {
    handle() {
        console.log("Yellow Light → Slow down!");
    }
}
class RedLight {
    handle() {
        console.log("Red Light → Stop!");
    }
}
// Context
class TrafficLight {
    constructor(initialState) {
        this.state = initialState;
    }
    setState(state) {
        this.state = state;
    }
    request() {
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
