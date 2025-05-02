// CHAIN OF RESPONSIBILITY PATTERN
// The Chain of Responsibility pattern passes a request along a chain of handlers.
// Each handler decides either to process the request or pass it to the next handler.

/**
 * What it does:
 * Allows a request to be passed along a chain of handlers until one of them handles it.
 * 
 * When to use:
 * You want to decouple the sender of a request from its receiver.
 * Multiple objects may handle the request.
 * Handlers should be dynamically configurable.
 * 
 * How it works:
 * Each handler has a reference to the next handler. When a request is received, a handler
 * processes it or passes it along the chain.
 * 
 * Real-life example:
 * A customer support system where a query is passed from a chatbot → junior agent → senior agent.
 * 
 * Pros:
 * Reduces coupling between sender and receiver.
 * Can add/remove handlers easily.
 * 
 * Cons:
 * No guarantee the request will be handled.
 * Can be hard to trace the request path in long chains.
 */

// Handler interface
interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string | null;
}

// Abstract base handler that implements the chaining logic
abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | null = null;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler
    }

    handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

// Concrete handlers
class EmailHandler extends AbstractHandler {
    handle(request: string): string | null {
        if (request === 'email') {
            return `EmailHandler: I'll handle the ${request} request.`;
        }
        console.log(`EmailHandler: I can't handle ${request}, passing to next.`);
        return super.handle(request);
    }
}

class SMSHandler extends AbstractHandler {
    handle(request: string): string | null {
        if (request === "sms") {
            return `SMSHandler: I'll handle the ${request} request.`;
        }
        console.log(`SMSHandler: I can't handle ${request}, passing to next.`);
        return super.handle(request);
    }
}

class PushNotificationHandler extends AbstractHandler {
    handle(request: string): string | null {
        if (request === "push") {
            return `PushNotificationHandler: I'll handle the ${request} request.`;
        }
        console.log(`PushNotificationHandler: I can't handle ${request}, passing to next.`);
        return super.handle(request);
    }
}

// Client code
function clientChainOfResponsibility() {
    const email = new EmailHandler();
    const sms = new SMSHandler();
    const push = new PushNotificationHandler();

    // Build the chain
    email.setNext(sms).setNext(push);

    console.log("Chain: Email > SMS > Push\n");

    // Testing different requests
    console.log(email.handle("email") || "No handler found");
    console.log(email.handle("sms") || "No handler found");
    console.log(email.handle("push") || "No handler found");
    console.log(email.handle("social") || "No handler found");
}

// Demo
console.log("CHAIN OF RESPONSIBILITY PATTERN DEMO:");
clientChainOfResponsibility();
console.log("\n");

/*
CHAIN OF RESPONSIBILITY PATTERN DEMO:
Chain: Email > SMS > Push

EmailHandler: I'll handle the email request.
EmailHandler: I can't handle sms, passing to next.
SMSHandler: I'll handle the sms request.
EmailHandler: I can't handle push, passing to next.
SMSHandler: I can't handle push, passing to next.
PushNotificationHandler: I'll handle the push request.
EmailHandler: I can't handle social, passing to next.
SMSHandler: I can't handle social, passing to next.
PushNotificationHandler: I can't handle social, passing to next.     
No handler found
*/