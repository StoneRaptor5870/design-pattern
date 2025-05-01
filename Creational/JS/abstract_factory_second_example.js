"use strict";
// Concrete product A1
class WindowsButton {
    render() {
        return '<button class="windows-btn">Windows Button</button>';
    }
    onClick() {
        console.log('Windows button clicked');
    }
}
// Concrete product B1
class WindowsCheckbox {
    render() {
        return '<input type="checkbox" class="windows-checkbox">';
    }
    toggle() {
        console.log('Windows checkbox toggled');
    }
}
// Concrete product A2
class MacButton {
    render() {
        return '<button class="mac-btn">Mac Button</button>';
    }
    onClick() {
        console.log('Mac button clicked');
    }
}
// Concrete product B2
class MacCheckbox {
    render() {
        return '<input type="checkbox" class="mac-checkbox">';
    }
    toggle() {
        console.log('Mac checkbox toggled');
    }
}
// Concrete factory 1
class WindowsFactory {
    createButton() {
        return new WindowsButton();
    }
    createCheckbox() {
        return new WindowsCheckbox();
    }
}
// Concrete factory 2
class MacFactory {
    createButton() {
        return new MacButton();
    }
    createCheckbox() {
        return new MacCheckbox();
    }
}
// Client code
class Application {
    constructor(factory) {
        this.button = null;
        this.checkbox = null;
        this.factory = factory;
    }
    createUI() {
        this.button = this.factory.createButton();
        this.checkbox = this.factory.createCheckbox();
    }
    render() {
        if (this.button && this.checkbox) {
            console.log(this.button.render());
            console.log(this.checkbox.render());
        }
    }
}
// Usage
const os = 'Windows'; // or 'Mac'
let factory3;
if (os === 'Windows') {
    factory3 = new WindowsFactory();
}
else {
    factory3 = new MacFactory();
}
const app = new Application(factory3);
app.createUI();
app.render();
