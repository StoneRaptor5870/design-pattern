// Observer interface
interface Observer2 {
    update(message: string): void;
  }
  
  // Subject
  class Channel {
    private observers: Observer2[] = [];
  
    subscribe(observer: Observer2): void {
      this.observers.push(observer);
    }
  
    unsubscribe(observer: Observer2): void {
      this.observers = this.observers.filter(sub => sub !== observer);
    }
  
    notify(message: string): void {
      for (const observer of this.observers) {
        observer.update(message);
      }
    }
  
    publishVideo(title: string): void {
      console.log(`New video uploaded: ${title}`);
      this.notify(`Watch our new video: ${title}`);
    }
  }
  
  // Concrete Observers
  class Subscriber implements Observer2 {
    constructor(private name: string) {}
  
    update(message: string): void {
      console.log(`${this.name} received: ${message}`);
    }
  }
  
  // Usage
  const channel = new Channel();
  
  const alice = new Subscriber("Alice");
  const bob = new Subscriber("Bob");
  
  channel.subscribe(alice);
  channel.subscribe(bob);
  
  channel.publishVideo("Observer Pattern in TypeScript");
  
  // Output:
  // New video uploaded: Observer Pattern in TypeScript
  // Alice received: Watch our new video: Observer Pattern in TypeScript
  // Bob received: Watch our new video: Observer Pattern in TypeScript
  