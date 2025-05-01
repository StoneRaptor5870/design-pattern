"use strict";
class RealImage {
    constructor(filename) {
        this.filename = filename;
        this.loadFromDisk();
    }
    loadFromDisk() {
        console.log(`Loading ${this.filename}`);
    }
    display() {
        console.log(`Displaying ${this.filename}`);
    }
}
class ProxyImage {
    constructor(filename) {
        this.filename = filename;
        this.realImage = null;
    }
    display() {
        if (!this.realImage) {
            this.realImage = new RealImage(this.filename);
        }
        this.realImage.display();
    }
}
// Usage
const image = new ProxyImage("pic.jpg");
image.display(); // Loads and displays
image.display(); // Only displays
// Loading pic.jpg
// Displaying pic.jpg
// Displaying pic.jpg
