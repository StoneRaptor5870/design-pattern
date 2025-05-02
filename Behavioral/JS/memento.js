"use strict";
// MEMENTO PATTERN
// The Memento pattern captures and externalizes an object's internal state without
// violating encapsulation, making it possible to restore the object to this state later.
/**
 * What it does:
 * Captures and externalizes an object's internal state so it can be restored later,
 * without violating encapsulation.
 *
 * When to use:
 * You need to implement undo/redo.
 * You want to capture snapshots of an object’s state.
 * You don’t want other classes to have direct access to the object’s internals.
 *
 * How it works:
 * Originator: The object whose state we want to save.
 * Memento: Stores the state.
 * Caretaker: Manages mementos, but doesn’t inspect or modify them.
 *
 * Real-life example:
 * A text editor with Undo functionality. You can revert to previous versions of your text.
 *
 * Pros:
 * Preserves encapsulation.
 * Supports rollback/undo functionality.
 *
 * Cons:
 * Can consume a lot of memory if many mementos are stored.
 * Caretaker may get complex if not managed properly.
 */
// Memento - stores the state
class EditorMemento {
    constructor(content) {
        this.content = content;
    }
    getContent() {
        return this.content;
    }
}
// Originator - the object whose state we want to save
class TextEditor {
    constructor() {
        this.content = "";
    }
    setContent(content) {
        this.content = content;
    }
    getContent() {
        return this.content;
    }
    // Creates a memento containing the current state
    save() {
        return new EditorMemento(this.content);
    }
    // Restores the state from a memento
    restore(memento) {
        this.content = memento.getContent();
    }
}
// Caretaker - keeps track of multiple mementos
class MementoHistory {
    constructor() {
        this.mementos = [];
    }
    push(memento) {
        this.mementos.push(memento);
    }
    pop() {
        return this.mementos.pop();
    }
}
// Client
function clientMemento() {
    const editor = new TextEditor();
    const history = new MementoHistory();
    // Make changes and save state
    editor.setContent("First draft");
    history.push(editor.save());
    console.log(`Current content: ${editor.getContent()}`);
    // Make more changes and save state
    editor.setContent("Second draft with revisions");
    history.push(editor.save());
    console.log(`Current content: ${editor.getContent()}`);
    // Make final changes
    editor.setContent("Final version");
    console.log(`Current content: ${editor.getContent()}`);
    // Restore to previous state
    const previousState = history.pop();
    if (previousState) {
        editor.restore(previousState);
        console.log(`After restore to previous: ${editor.getContent()}`);
    }
    // Restore to original state
    const originalState = history.pop();
    if (originalState) {
        editor.restore(originalState);
        console.log(`After restore to original: ${editor.getContent()}`);
    }
}
// Demo
console.log("MEMENTO PATTERN DEMO:");
clientMemento();
console.log("\n");
/*
MEMENTO PATTERN DEMO:
Current content: First draft
Current content: Second draft with revisions
Current content: Final version
After restore to previous: Second draft with revisions
After restore to original: First draft
*/ 
