"use strict";
// 2. Real Subject
class RealInternet {
    connectTo(serverHost) {
        console.log(`Connected to ${serverHost}`);
    }
}
// 3. Protection Proxy
class ProtectionProxy {
    constructor() {
        this.bannedSites = ['facebook.com', 'instagram.com', 'twitter.com'];
        this.realInternet = new RealInternet();
    }
    connectTo(serverHost) {
        if (this.bannedSites.includes(serverHost)) {
            throw new Error(`Access to ${serverHost} is denied`);
        }
        console.log(`Protection proxy checking request to ${serverHost}`);
        this.realInternet.connectTo(serverHost);
    }
}
// 4. Virtual Proxy (Lazy Initialization)
class VirtualProxy {
    constructor() {
        this.realInternet = null;
    }
    connectTo(serverHost) {
        console.log("Virtual Proxy: Lazy initialization of real subject");
        if (this.realInternet === null) {
            console.log("Creating RealInternet instance on first use");
            this.realInternet = new RealInternet();
        }
        this.realInternet.connectTo(serverHost);
    }
}
// 5. Logging Proxy
class LoggingProxy {
    constructor() {
        this.realInternet = new RealInternet();
    }
    connectTo(serverHost) {
        console.log(`Logging: Attempt to connect to ${serverHost} at ${new Date().toISOString()}`);
        try {
            this.realInternet.connectTo(serverHost);
            console.log(`Logging: Successfully connected to ${serverHost}`);
        }
        catch (error) {
            console.log(`Logging: Failed to connect to ${serverHost}`);
            throw error;
        }
    }
}
// 6. Cache Proxy
class CacheProxy {
    constructor() {
        this.cache = new Set();
        this.realInternet = new RealInternet();
    }
    connectTo(serverHost) {
        if (this.cache.has(serverHost)) {
            console.log(`Cache hit: Retrieving ${serverHost} from cache`);
            return;
        }
        console.log(`Cache miss: ${serverHost} not in cache`);
        this.realInternet.connectTo(serverHost);
        // Cache the result
        this.cache.add(serverHost);
        console.log(`Added ${serverHost} to cache`);
    }
}
// 7. Proxy Chain - combining multiple proxies
class ProxyChain {
    constructor() {
        // Create a chain of proxies
        // The flow will be: Request -> Cache -> Logging -> Protection -> RealInternet
        const realInternet = new RealInternet();
        const protectionProxy = new CustomProtectionProxy(realInternet);
        const loggingProxy = new CustomLoggingProxy(protectionProxy);
        const cacheProxy = new CustomCacheProxy(loggingProxy);
        this.internet = cacheProxy;
    }
    connectTo(serverHost) {
        console.log("Starting proxy chain");
        this.internet.connectTo(serverHost);
        console.log("Proxy chain complete");
    }
}
// Custom proxy classes for chaining
class CustomProtectionProxy {
    constructor(internet) {
        this.internet = internet;
        this.bannedSites = ['facebook.com', 'instagram.com', 'twitter.com'];
    }
    connectTo(serverHost) {
        if (this.bannedSites.includes(serverHost)) {
            throw new Error(`Access to ${serverHost} is denied`);
        }
        console.log(`Protection proxy checking request to ${serverHost}`);
        this.internet.connectTo(serverHost);
    }
}
class CustomLoggingProxy {
    constructor(internet) {
        this.internet = internet;
    }
    connectTo(serverHost) {
        console.log(`Logging: Attempt to connect to ${serverHost} at ${new Date().toISOString()}`);
        try {
            this.internet.connectTo(serverHost);
            console.log(`Logging: Successfully connected to ${serverHost}`);
        }
        catch (error) {
            console.log(`Logging: Failed to connect to ${serverHost}`);
            throw error;
        }
    }
}
class CustomCacheProxy {
    constructor(internet) {
        this.internet = internet;
        this.cache = new Set();
    }
    connectTo(serverHost) {
        if (this.cache.has(serverHost)) {
            console.log(`Cache hit: Retrieving ${serverHost} from cache`);
            return;
        }
        console.log(`Cache miss: ${serverHost} not in cache`);
        this.internet.connectTo(serverHost);
        // Cache the result
        this.cache.add(serverHost);
        console.log(`Added ${serverHost} to cache`);
    }
}
// Usage examples
console.log("=== Protection Proxy Example ===");
const protectionProxy = new ProtectionProxy();
try {
    protectionProxy.connectTo('geeksforgeeks.org');
    protectionProxy.connectTo('facebook.com'); // This will be blocked
}
catch (e) {
    console.log(e.message);
}
// Virtual Proxy
console.log("\n=== Virtual Proxy Example ===");
const virtualProxy = new VirtualProxy();
virtualProxy.connectTo('google.com'); // First time creates the real subject
virtualProxy.connectTo('microsoft.com'); // Uses already created real subject
// Logging Proxy
console.log("\n=== Logging Proxy Example ===");
const loggingProxy = new LoggingProxy();
loggingProxy.connectTo('github.com');
// Cache Proxy
console.log("\n=== Cache Proxy Example ===");
const cacheProxy = new CacheProxy();
cacheProxy.connectTo('stackoverflow.com'); // Cache miss
cacheProxy.connectTo('stackoverflow.com'); // Cache hit
cacheProxy.connectTo('medium.com'); // Cache miss
// Proxy Chain Example
console.log("\n=== Proxy Chain Example ===");
const proxyChain = new ProxyChain();
try {
    proxyChain.connectTo('nodejs.org');
    proxyChain.connectTo('nodejs.org'); // Should hit cache
    proxyChain.connectTo('facebook.com'); // Should be blocked by protection proxy
}
catch (e) {
    console.log(e.message);
}
/*
=== Protection Proxy Example ===
Protection proxy checking request to geeksforgeeks.org
Connected to geeksforgeeks.org
Access to facebook.com is denied

=== Virtual Proxy Example ===
Virtual Proxy: Lazy initialization of real subject
Creating RealInternet instance on first use
Connected to google.com
Virtual Proxy: Lazy initialization of real subject
Connected to microsoft.com

=== Logging Proxy Example ===
Logging: Attempt to connect to github.com at 2025-05-01T10:50:32.535Z
Connected to github.com
Logging: Successfully connected to github.com

=== Cache Proxy Example ===
Cache miss: stackoverflow.com not in cache
Connected to stackoverflow.com
Added stackoverflow.com to cache
Cache hit: Retrieving stackoverflow.com from cache
Cache miss: medium.com not in cache
Connected to medium.com
Added medium.com to cache

=== Proxy Chain Example ===
Starting proxy chain
Cache miss: nodejs.org not in cache
Logging: Attempt to connect to nodejs.org at 2025-05-01T10:50:32.542Z
Protection proxy checking request to nodejs.org
Connected to nodejs.org
Logging: Successfully connected to nodejs.org
Added nodejs.org to cache
Proxy chain complete
Starting proxy chain
Cache hit: Retrieving nodejs.org from cache
Proxy chain complete
Starting proxy chain
Cache miss: facebook.com not in cache
Logging: Attempt to connect to facebook.com at 2025-05-01T10:50:32.546Z
Logging: Failed to connect to facebook.com
Access to facebook.com is denied
*/ 
