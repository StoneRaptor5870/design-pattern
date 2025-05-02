// STRATEGY PATTERN
// The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them
// interchangeable. It lets the algorithm vary independently from clients that use it.

/**
 * What it does:
 * Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.
 * This pattern lets the algorithm vary independently from clients that use it.
 * 
 * When to use:
 * When you have multiple related algorithms or behaviors.
 * When you want to switch between algorithms dynamically.
 * To avoid complex if-else or switch-case blocks.
 * 
 * How it works:
 * Strategy Interface: Defines a common interface for all supported strategies.
 * Concrete Strategies: Implement different versions of the algorithm.
 * Context: Uses a Strategy to perform an operation. 
 * 
 * Real-life example:
 * A navigation app that lets you choose a route strategy: fastest, shortest,
 * or least traffic. You can switch strategies dynamically.
 * 
 * Pros:
 * Promotes Open/Closed Principle (easy to add new strategies).
 * Avoids duplicate code.
 * Algorithms are encapsulated and reusable.
 * 
 * Cons:
 * Adds extra classes and complexity.
 * Clients must understand the differences between strategies.
 */

// Strategy interface
interface PaymentStrategy {
    pay(amount: number): void;
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
    constructor(private cardNumber: string, private cvv: string, private dateOfExpiry: string) { }

    pay(amount: number): void {
        console.log(`Paid ${amount} using Credit Card: ${this.cardNumber}`);
    }
}

class PayPalPayment implements PaymentStrategy {
    constructor(private email: string) { }

    pay(amount: number): void {
        console.log(`Paid ${amount} using PayPal: ${this.email}`);
    }
}

class BitcoinPayment implements PaymentStrategy {
    constructor(private address: string) { }

    pay(amount: number): void {
        console.log(`Paid ${amount} using Bitcoin: ${this.address}`);
    }
}

// Context
class ShoppingCart {
    private items: { name: string, price: number }[] = [];

    addItem(name: string, price: number): void {
        this.items.push({ name, price });
    }

    calculateTotal(): number {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    pay(paymentMethod: PaymentStrategy): void {
        const amount = this.calculateTotal();
        paymentMethod.pay(amount);
    }
}

class PaymentContext {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    pay(amount: number): void {
        this.strategy.pay(amount);
    }
}

// Client
function clientStrategy() {
    const cart = new ShoppingCart();
    cart.addItem("Laptop", 1200);
    cart.addItem("Mouse", 50);

    console.log("Items added, total: $" + cart.calculateTotal());

    // Pay with different strategies
    cart.pay(new CreditCardPayment("1234 5678 9012 3456", "123", "12/25"));
    cart.pay(new PayPalPayment("example@example.com"));
    cart.pay(new BitcoinPayment("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"));
}

function payStrategy() {
    const payment = new PaymentContext(new CreditCardPayment("1234 5678 9012 3456", "123", "12/25"));
    payment.pay(500);
    payment.setStrategy(new PayPalPayment("example@example.com"));
    payment.pay(250);
}

// Demo
console.log("STRATEGY PATTERN DEMO:");
clientStrategy();
console.log("------------------------------");
payStrategy();
console.log("\n");

/*
STRATEGY PATTERN DEMO:
Items added, total: $1250
Paid 1250 using Credit Card: 1234 5678 9012 3456
Paid 1250 using PayPal: example@example.com
Paid 1250 using Bitcoin: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
------------------------------
Paid 500 using Credit Card: 1234 5678 9012 3456
Paid 250 using PayPal: example@example.com
*/