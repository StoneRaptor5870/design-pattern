"use strict";
// Base Component
class Component {
    constructor(mediator) {
        this.mediator = mediator;
    }
}
// Concrete Components
class Button extends Component {
    click() {
        console.log("Button clicked");
        this.mediator.notify(this, "click");
    }
}
class TextBox extends Component {
    show() {
        console.log("TextBox is visible");
    }
    hide() {
        console.log("TextBox is hidden");
    }
}
// Concrete Mediator
class UIControlMediator {
    constructor() {
        this.textBox = new TextBox(this);
        this.button = new Button(this);
    }
    getButton() {
        return this.button;
    }
    getTextBox() {
        return this.textBox;
    }
    notify(sender, event) {
        if (sender instanceof Button && event === "click") {
            this.textBox.show();
        }
    }
}
// Usage
const mediator = new UIControlMediator();
const button = mediator.getButton();
button.click(); // Button clicked → TextBox is visible
