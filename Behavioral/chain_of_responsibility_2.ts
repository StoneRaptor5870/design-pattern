// Handler Interface
interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string | null;
}

// Abstract Handler
abstract class AbstractHandler2 implements Handler {
    private nextHandler: Handler | null = null;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

// Concrete Handlers
class SpamFilter extends AbstractHandler2 {
    public handle(request: string): string | null {
        if (request === "spam") {
            return "SpamFilter: Marked as spam.";
        }
        return super.handle(request);
    }
}

class SalesHandler extends AbstractHandler2 {
    public handle(request: string): string | null {
        if (request === "sales") {
            return "SalesHandler: Handled sales request.";
        }
        return super.handle(request);
    }
}

class SupportHandler extends AbstractHandler2 {
    public handle(request: string): string | null {
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
    console.log(`${req}: ${result ?? "No handler available"}`);
}

/*
support: SupportHandler: Handled support request.
sales: SalesHandler: Handled sales request.
spam: SpamFilter: Marked as spam.
unknown: No handler available
*/
