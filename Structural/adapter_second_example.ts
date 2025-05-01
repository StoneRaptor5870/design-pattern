// Target interface
interface Target {
    request(): string;
}

// The client expects all objects to use this interface
class Adaptee {
    public specificRequest(): string {
        return 'Specific request implementation';
    }
}

// Adapter makes Adaptee compatible with Target
class Adapter implements Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        this.adaptee = adaptee;
    }

    public request(): string {
        const result = this.adaptee.specificRequest();
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

// Client code
function clientCode(target: Target) {
    console.log(target.request());
}

// Usage
console.log('Client: I can work with Target objects:');
const target = {
    request: () => 'Target: The default target\'s behavior.'
};
clientCode(target);

console.log('Client: I need to use an Adaptee, but it has an incompatible interface:');
const adaptee = new Adaptee();
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('Client: With the Adapter, I can use the Adaptee:');
const adapter = new Adapter(adaptee);
clientCode(adapter);