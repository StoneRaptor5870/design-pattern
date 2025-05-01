/**
 * Provide a placeholder or surrogate to control access to another object.
 * 
 * Purpose: Provide a placeholder to control access to another object.
 * 
 * Use When:
 * You want to control access (e.g., lazy loading, logging, access control).
 * You want to add functionality without modifying the actual object.
 * 
 * How it works:
 * The proxy implements the same interface and forwards requests to the real object, optionally adding behavior.
 * 
 * Real-life:
 * API Gateways.
 * Virtual proxies (e.g. image loading preview).
 * Auth guards in web apps.
 * 
 * Pros:
 * Adds control (access, logging, caching).
 * Useful in lazy loading.
 * 
 * Cons:
 * Adds overhead.
 * More boilerplate.
 */

class RealAPI {
    request(): void {
        console.log("Fetching real data...");
    }
}

class APIProxy {
    private api = new RealAPI();

    request(user: string): void {
        if (user === "admin") {
            this.api.request();
        } else {
            console.log("Access denied.");
        }
    }
}

const proxy = new APIProxy();
proxy.request("admin"); // Fetching real data...
proxy.request("guest"); // Access denied.
