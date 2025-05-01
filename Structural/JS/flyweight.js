"use strict";
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
    constructor(name, colour) {
        this.name = name;
        this.colour = colour;
    }
    draw(x, y) {
        console.log(`Drawing ${this.name} tree in ${this.colour} at (${x}, ${y})`);
    }
}
class TreeFactory {
    constructor() {
        this.types = {};
    }
    getTreeType(name, colour) {
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
