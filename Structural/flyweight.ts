/**
 * Share objects to support large numbers of similar objects efficiently.
 * 
 * Purpose: Share common data to reduce memory usage when many similar objects are used.
 * 
 * Use When:
 * You have many similar objects that use too much memory.
 * When object creation becomes a performance or memory bottleneck.
 * Object creation is costly and many instances share state.
 * 
 * How it works:
 * Separate intrinsic (shared) state from extrinsic (unique) state.
 * Reuse shared objects.
 * 
 * Divide object state into:
 * Intrinsic state: Shared and stored in the flyweight.
 * Extrinsic state: Passed in externally for context.
 * Use a factory or cache to manage and reuse flyweights.
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
    constructor(public name: string, public colour: string) { }

    draw(x: number, y: number) {
        console.log(`Drawing ${this.name} tree in ${this.colour} at (${x}, ${y})`);
    }
}

class TreeFactory {
    private types: Record<string, TreeType> = {};

    getTreeType(name: string, colour: string): TreeType {
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