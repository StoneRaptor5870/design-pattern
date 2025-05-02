"use strict";
// Abstract Handler
class AbstractHandler2 {
    constructor() {
        this.nextHandler = null;
    }
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}
// Concrete Handlers
class SpamFilter extends AbstractHandler2 {
    handle(request) {
        if (request === "spam") {
            return "SpamFilter: Marked as spam.";
        }
        return super.handle(request);
    }
}
class SalesHandler extends AbstractHandler2 {
    handle(request) {
        if (request === "sales") {
            return "SalesHandler: Handled sales request.";
        }
        return super.handle(request);
    }
}
class SupportHandler extends AbstractHandler2 {
    handle(request) {
        if (request === "support") {
            return "SupportHandler: Handled support request.";
        }
        return super.handle(request);
    }
}
// Usage
const spam = new SpamFilter();
const sales = new SalesHandler();
const support = new SupportHandler();
spam.setNext(sales).setNext(support);
const requests = ["support", "sales", "spam", "unknown"];
for (const req of requests) {
    const result = spam.handle(req);
    console.log(`${req}: ${result !== null && result !== void 0 ? result : "No handler available"}`);
}
/*
support: SupportHandler: Handled support request.
sales: SalesHandler: Handled sales request.
spam: SpamFilter: Marked as spam.
unknown: No handler available
*/
