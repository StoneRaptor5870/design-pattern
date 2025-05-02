// Mediator Interface
interface Mediator {
    notify(sender: Component, event: string): void;
}

// Base Component
abstract class Component {
    protected mediator: Mediator;

    constructor(mediator: Mediator) {
        this.mediator = mediator;
    }
}

// Concrete Components
class Button extends Component {
    click(): void {
        console.log("Button clicked");
        this.mediator.notify(this, "click");
    }
}

class TextBox extends Component {
    show(): void {
        console.log("TextBox is visible");
    }

    hide(): void {
        console.log("TextBox is hidden");
    }
}

// Concrete Mediator
class UIControlMediator implements Mediator {
    private button: Button;
    private textBox: TextBox;

    constructor() {
        this.textBox = new TextBox(this);
        this.button = new Button(this);
    }

    getButton(): Button {
        return this.button;
    }

    getTextBox(): TextBox {
        return this.textBox;
    }

    notify(sender: Component, event: string): void {
        if (sender instanceof Button && event === "click") {
            this.textBox.show();
        }
    }
}

// Usage
const mediator = new UIControlMediator();
const button = mediator.getButton();

button.click(); // Button clicked → TextBox is visible
