interface IImage {
    display(): void;
}

class RealImage implements IImage {
    constructor(private filename: string) {
        this.loadFromDisk();
    }

    private loadFromDisk(): void {
        console.log(`Loading ${this.filename}`);
    }

    public display(): void {
        console.log(`Displaying ${this.filename}`);
    }
}

class ProxyImage implements IImage {
    private realImage: RealImage | null = null;

    constructor(private filename: string) { }

    public display(): void {
        if (!this.realImage) {
            this.realImage = new RealImage(this.filename);
        }
        this.realImage.display();
    }
}

// Usage
const image: IImage = new ProxyImage("pic.jpg");
image.display(); // Loads and displays
image.display(); // Only displays

// Loading pic.jpg
// Displaying pic.jpg
// Displaying pic.jpg