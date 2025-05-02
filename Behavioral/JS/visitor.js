"use strict";
// VISITOR PATTERN
// The Visitor pattern represents an operation to be performed on elements of an object structure
// without changing the classes of the elements it works on.
// Concrete elements
class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    accept(visitor) {
        visitor.visitCircle(this);
    }
}
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    accept(visitor) {
        visitor.visitRectangle(this);
    }
}
class Triangle {
    constructor(side1, side2, side3) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
    accept(visitor) {
        visitor.visitTriangle(this);
    }
}
// Concrete visitors
class AreaCalculator {
    constructor() {
        this.area = 0;
    }
    visitCircle(circle) {
        this.area = Math.PI * circle.radius * circle.radius;
        console.log(`Circle area: ${this.area.toFixed(2)}`);
    }
    visitRectangle(rectangle) {
        this.area = rectangle.width * rectangle.height;
        console.log(`Rectangle area: ${this.area.toFixed(2)}`);
    }
    visitTriangle(triangle) {
        // Using Heron's formula
        const s = (triangle.side1 + triangle.side2 + triangle.side3) / 2;
        this.area = Math.sqrt(s * (s - triangle.side1) * (s - triangle.side2) * (s - triangle.side3));
        console.log(`Triangle area: ${this.area.toFixed(2)}`);
    }
}
class PerimeterCalculator {
    constructor() {
        this.perimeter = 0;
    }
    visitCircle(circle) {
        this.perimeter = 2 * Math.PI * circle.radius;
        console.log(`Circle perimeter: ${this.perimeter.toFixed(2)}`);
    }
    visitRectangle(rectangle) {
        this.perimeter = 2 * (rectangle.width + rectangle.height);
        console.log(`Rectangle perimeter: ${this.perimeter.toFixed(2)}`);
    }
    visitTriangle(triangle) {
        this.perimeter = triangle.side1 + triangle.side2 + triangle.side3;
        console.log(`Triangle perimeter: ${this.perimeter.toFixed(2)}`);
    }
}
// Client
function clientVisitor() {
    const shapes = [
        new Circle(5),
        new Rectangle(4, 6),
        new Triangle(3, 4, 5)
    ];
    const areaCalculator = new AreaCalculator();
    const perimeterCalculator = new PerimeterCalculator();
    console.log("Calculating areas:");
    shapes.forEach(shape => shape.accept(areaCalculator));
    console.log("\nCalculating perimeters:");
    shapes.forEach(shape => shape.accept(perimeterCalculator));
}
// Demo
console.log("VISITOR PATTERN DEMO:");
clientVisitor();
/*
VISITOR PATTERN DEMO:
Calculating areas:
Circle area: 78.54
Rectangle area: 24.00
Triangle area: 6.00

Calculating perimeters:
Circle perimeter: 31.42
Rectangle perimeter: 20.00
Triangle perimeter: 12.00
*/ 
