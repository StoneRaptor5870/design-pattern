// Abstract product interfaces
interface Button {
    render(): string;
    onClick(): void;
}

interface Checkbox {
    render(): string;
    toggle(): void;
}

// Concrete product A1
class WindowsButton implements Button {
    render(): string {
        return '<button class="windows-btn">Windows Button</button>';
    }

    onClick(): void {
        console.log('Windows button clicked');
    }
}

// Concrete product B1
class WindowsCheckbox implements Checkbox {
    render(): string {
        return '<input type="checkbox" class="windows-checkbox">';
    }

    toggle(): void {
        console.log('Windows checkbox toggled');
    }
}

// Concrete product A2
class MacButton implements Button {
    render(): string {
        return '<button class="mac-btn">Mac Button</button>';
    }

    onClick(): void {
        console.log('Mac button clicked');
    }
}

// Concrete product B2
class MacCheckbox implements Checkbox {
    render(): string {
        return '<input type="checkbox" class="mac-checkbox">';
    }

    toggle(): void {
        console.log('Mac checkbox toggled');
    }
}

// Abstract factory interface
interface GUIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
}

// Concrete factory 1
class WindowsFactory implements GUIFactory {
    createButton(): Button {
        return new WindowsButton();
    }

    createCheckbox(): Checkbox {
        return new WindowsCheckbox();
    }
}

// Concrete factory 2
class MacFactory implements GUIFactory {
    createButton(): Button {
        return new MacButton();
    }

    createCheckbox(): Checkbox {
        return new MacCheckbox();
    }
}

// Client code
class Application {
    private factory: GUIFactory;
    private button: Button | null = null;
    private checkbox: Checkbox | null = null;

    constructor(factory: GUIFactory) {
        this.factory = factory;
    }

    createUI(): void {
        this.button = this.factory.createButton();
        this.checkbox = this.factory.createCheckbox();
    }

    render(): void {
        if (this.button && this.checkbox) {
            console.log(this.button.render());
            console.log(this.checkbox.render());
        }
    }
}

// Usage
const os = 'Windows'; // or 'Mac'
let factory3: GUIFactory;

if (os === 'Windows') {
    factory3 = new WindowsFactory();
} else {
    factory3 = new MacFactory();
}

const app = new Application(factory3);
app.createUI();
app.render();