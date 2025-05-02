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