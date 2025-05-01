"use strict";
/**
 * Decouples an abstraction from its implementation so that the two can vary independently.
 *
 * Purpose: Decouple abstraction from implementation.
 *
 * Use When:
 * You need to run multiple variations of an abstraction and implementation.
 * You want to avoid a complex inheritance hierarchy.
 *
 * How it works:
 * Separate abstraction and implementation into different class hierarchies and link them with a bridge.
 *
 * Real-life:
 * Database drivers for different DBs using a unified interface.
 *
 * Pros:
 * Independent evolution of abstraction and implementation.
 *
 * Cons:
 * Adds complexity.
 */
class SVGRenderer {
    renderCircle(radius) {
        console.log(`Rendering SVG circle with radius ${radius}`);
    }
}
class CanvasRenderer {
    renderCircle(radius) {
        console.log(`Rendering Canvas circle with radius ${radius}`);
    }
}
class Circle {
    constructor(renderer, radius) {
        this.renderer = renderer;
        this.radius = radius;
    }
    draw() {
        this.renderer.renderCircle(this.radius);
    }
}
const circle = new Circle(new CanvasRenderer(), 10);
circle.draw(); // Rendering Canvas circle with radius 10
const circle2 = new Circle(new SVGRenderer(), 5);
circle2.draw(); // Rendering SVG circle with radius 5
