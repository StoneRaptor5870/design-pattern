"use strict";
// OBSERVER PATTERN
// The Observer pattern defines a one-to-many dependency between objects, so when one
// object changes state, all its dependents are notified and updated automatically.
// Concrete subject
class WeatherStation {
    constructor() {
        this.observers = [];
        this.temperature = 0;
    }
    attach(observer) {
        const isExist = this.observers.includes(observer);
        if (!isExist) {
            this.observers.push(observer);
            console.log("Weather station: Observer attached");
        }
    }
    detach(observer) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
            console.log("Weather station: Observer detached");
        }
    }
    notify() {
        console.log("Weather station: Notifying observers...");
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
    // Methods specific to Weather Station
    setTemperature(temperature) {
        console.log(`Weather station: Temperature changed to ${temperature}`);
        this.temperature = temperature;
        this.notify();
    }
    getTemperature() {
        return this.temperature;
    }
}
// Concrete observer
class TemperatureDisplay {
    constructor(name) {
        this.name = name;
    }
    update(subject) {
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
