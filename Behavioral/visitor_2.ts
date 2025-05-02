// Element Interface
interface ShoppingCartItem {
    accept(visitor: CartVisitor): void;
}

// Concrete Element: Book
class Book implements ShoppingCartItem {
    constructor(private price: number) { }

    accept(visitor: CartVisitor): void {
        visitor.visitBook(this);
    }

    getPrice(): number {
        return this.price;
    }
}

// Concrete Element: Electronic
class Electronic implements ShoppingCartItem {
    constructor(private price: number) { }

    accept(visitor: CartVisitor): void {
        visitor.visitElectronic(this);
    }

    getPrice(): number {
        return this.price;
    }
}

// Visitor Interface
interface CartVisitor {
    visitBook(book: Book): void;
    visitElectronic(electronic: Electronic): void;
}

// Concrete Visitor: Calculate Total Price
class CartPriceCalculator implements CartVisitor {
    totalPrice: number = 0;

    visitBook(book: Book): void {
        this.totalPrice += book.getPrice();
        console.log(`Book Price: $${book.getPrice()}`);
    }

    visitElectronic(electronic: Electronic): void {
        this.totalPrice += electronic.getPrice();
        console.log(`Electronic Price: $${electronic.getPrice()}`);
    }

    getTotal(): number {
        return this.totalPrice;
    }
}

// Usage
const book = new Book(15);
const electronic = new Electronic(100);

const cartItems: ShoppingCartItem[] = [book, electronic];

const cartPriceCalculator = new CartPriceCalculator();

cartItems.forEach(item => item.accept(cartPriceCalculator));

console.log(`Total Price: $${cartPriceCalculator.getTotal()}`);

// Book Price: $15
// Electronic Price: $100
// Total Price: $115