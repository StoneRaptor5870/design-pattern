"use strict";
// Concrete Element: Book
class Book {
    constructor(price) {
        this.price = price;
    }
    accept(visitor) {
        visitor.visitBook(this);
    }
    getPrice() {
        return this.price;
    }
}
// Concrete Element: Electronic
class Electronic {
    constructor(price) {
        this.price = price;
    }
    accept(visitor) {
        visitor.visitElectronic(this);
    }
    getPrice() {
        return this.price;
    }
}
// Concrete Visitor: Calculate Total Price
class CartPriceCalculator {
    constructor() {
        this.totalPrice = 0;
    }
    visitBook(book) {
        this.totalPrice += book.getPrice();
        console.log(`Book Price: $${book.getPrice()}`);
    }
    visitElectronic(electronic) {
        this.totalPrice += electronic.getPrice();
        console.log(`Electronic Price: $${electronic.getPrice()}`);
    }
    getTotal() {
        return this.totalPrice;
    }
}
// Usage
const book = new Book(15);
const electronic = new Electronic(100);
const cartItems = [book, electronic];
const cartPriceCalculator = new CartPriceCalculator();
cartItems.forEach(item => item.accept(cartPriceCalculator));
console.log(`Total Price: $${cartPriceCalculator.getTotal()}`);
// Book Price: $15
// Electronic Price: $100
// Total Price: $115
