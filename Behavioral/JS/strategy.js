"use strict";
// STRATEGY PATTERN
// The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them
// interchangeable. It lets the algorithm vary independently from clients that use it.
// Concrete strategies
class CreditCardPayment {
    constructor(cardNumber, cvv, dateOfExpiry) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.dateOfExpiry = dateOfExpiry;
    }
    pay(amount) {
        console.log(`Paid ${amount} using Credit Card: ${this.cardNumber}`);
    }
}
class PayPalPayment {
    constructor(email) {
        this.email = email;
    }
    pay(amount) {
        console.log(`Paid ${amount} using PayPal: ${this.email}`);
    }
}
class BitcoinPayment {
    constructor(address) {
        this.address = address;
    }
    pay(amount) {
        console.log(`Paid ${amount} using Bitcoin: ${this.address}`);
    }
}
// Context
class ShoppingCart {
    constructor() {
        this.items = [];
    }
    addItem(name, price) {
        this.items.push({ name, price });
    }
    calculateTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
    pay(paymentMethod) {
        const amount = this.calculateTotal();
        paymentMethod.pay(amount);
    }
}
class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    pay(amount) {
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
