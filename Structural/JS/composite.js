"use strict";
/**
 * Treat individual objects and compositions of objects uniformly.
 *
 * Purpose: Compose objects into tree structures.
 *
 * Use When:
 * You want to represent part-whole hierarchies (e.g., file systems, menus).
 * You want to treat groups and individual elements the same way.
 *
 * How it works:
 * Create a tree structure where both leaf nodes and composite nodes implement the same interface.
 *
 * Real-life:
 * DOM nodes (div, span) with children.
 * File system (folders & files).
 *
 * Pros:
 * Uniform treatment of components and composites.
 *
 * Cons:
 * Overgeneralization.
 */
// Leaf
class MyFile {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
    display(indent = 0) {
        console.log(`${'  '.repeat(indent)}${this.name} (${this.size} KB)`);
    }
    getSize() {
        return this.size;
    }
}
// Composite
class Directory {
    constructor(name) {
        this.name = name;
        this.children = [];
    }
    add(component) {
        this.children.push(component);
        return this;
    }
    remove(component) {
        const index = this.children.indexOf(component);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }
    display(indent = 0) {
        console.log(`${'  '.repeat(indent)}${this.name} (${this.getSize()} KB)`);
        for (const child of this.children) {
            child.display(indent + 1);
        }
    }
    getSize() {
        return this.children.reduce((total, child) => total + child.getSize(), 0);
    }
}
// Usage
const root = new Directory('root');
const music = new Directory('Music');
const pictures = new Directory('Pictures');
const file1 = new MyFile('track1.mp3', 4000);
const file2 = new MyFile('track2.mp3', 5000);
const file3 = new MyFile('picture1.jpg', 2000);
const file4 = new MyFile('picture2.jpg', 3000);
root.add(music).add(pictures);
music.add(file1).add(file2);
pictures.add(file3).add(file4);
root.display();
