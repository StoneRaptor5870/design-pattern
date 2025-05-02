// VISITOR PATTERN
// The Visitor pattern represents an operation to be performed on elements of an object structure
// without changing the classes of the elements it works on.

/**
 * What it does:
 * Allows you to define new operations on elements of an object structure without changing the
 * classes of the elements.
 * 
 * When to use:
 * When you need to perform an operation on elements of an object structure (e.g., a collection of different classes).
 * When the operations that need to be applied to elements are frequently changing.
 * 
 * How it works:
 * Element: An object that accepts a visitor.
 * Visitor: Defines an operation to be performed on the elements.
 * ConcreteVisitor: Implements the actual operation to be performed.
 * Object Structure: A collection of elements that can accept a visitor.
 * 
 * Real-life example:
 * A shopping cart where you have different types of items (e.g., books, electronics).
 * You might want to calculate the price differently depending on the type of item.
 * 
 * Pros:
 * Allows operations to be added without modifying the classes of the elements.
 * Promotes open/closed principle.
 * Reduces the need for conditionals like if or switch based on types.
 * 
 * Cons:
 * Can increase the number of classes.
 * Visitors may become complex if the structure is large.
* Makes elements dependent on the visitor interface, which can reduce flexibility.
*/

// Visitor interface
interface Visitor {
    visitCircle(circle: Circle): void;
    visitRectangle(rectangle: Rectangle): void;
    visitTriangle(triangle: Triangle): void;
}

// Element interface
interface Shape {
    accept(visitor: Visitor): void;
}

// Concrete elements
class Circle implements Shape {
    constructor(public radius: number) { }

    accept(visitor: Visitor): void {
        visitor.visitCircle(this);
    }
}

class Rectangle implements Shape {
    constructor(public width: number, public height: number) { }

    accept(visitor: Visitor): void {
        visitor.visitRectangle(this);
    }
}

class Triangle implements Shape {
    constructor(public side1: number, public side2: number, public side3: number) { }

    accept(visitor: Visitor): void {
        visitor.visitTriangle(this);
    }
}

// Concrete visitors
class AreaCalculator implements Visitor {
    private area: number = 0

    visitCircle(circle: Circle): void {
        this.area = Math.PI * circle.radius * circle.radius;
        console.log(`Circle area: ${this.area.toFixed(2)}`);
    }

    visitRectangle(rectangle: Rectangle): void {
        this.area = rectangle.width * rectangle.height;
        console.log(`Rectangle area: ${this.area.toFixed(2)}`);
    }

    visitTriangle(triangle: Triangle): void {
        // Using Heron's formula
        const s = (triangle.side1 + triangle.side2 + triangle.side3) / 2;
        this.area = Math.sqrt(s * (s - triangle.side1) * (s - triangle.side2) * (s - triangle.side3));
        console.log(`Triangle area: ${this.area.toFixed(2)}`);
    }
}

class PerimeterCalculator implements Visitor {
    private perimeter = 0;

    visitCircle(circle: Circle): void {
        this.perimeter = 2 * Math.PI * circle.radius;
        console.log(`Circle perimeter: ${this.perimeter.toFixed(2)}`);
    }

    visitRectangle(rectangle: Rectangle): void {
        this.perimeter = 2 * (rectangle.width + rectangle.height);
        console.log(`Rectangle perimeter: ${this.perimeter.toFixed(2)}`);
    }

    visitTriangle(triangle: Triangle): void {
        this.perimeter = triangle.side1 + triangle.side2 + triangle.side3;
        console.log(`Triangle perimeter: ${this.perimeter.toFixed(2)}`);
    }
}

// Client
function clientVisitor() {
    const shapes: Shape[] = [
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