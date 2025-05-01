"use strict";
// Flyweight
class Character {
    constructor(char) {
        this.char = char;
        // Imagine this consumes a lot of memory
        console.log(`Character ${char} created`);
    }
    render(font, size, position) {
        console.log(`Character ${this.char} rendered with font ${font} at size ${size} in position (${position.x}, ${position.y})`);
    }
}
// Flyweight Factory
class CharacterFactory {
    constructor() {
        this.characters = {};
    }
    getCharacter(char) {
        // If character doesn't exist, create it
        if (!this.characters[char]) {
            this.characters[char] = new Character(char);
        }
        return this.characters[char];
    }
    getCount() {
        return Object.keys(this.characters).length;
    }
}
// Context
class TextEditor {
    constructor() {
        this.characters = [];
        this.positions = [];
        this.factory = new CharacterFactory();
    }
    write(text, font, size) {
        for (let i = 0; i < text.length; i++) {
            const char = this.factory.getCharacter(text[i]);
            const position = { x: i * 10, y: 20 };
            this.characters.push(char);
            this.positions.push(position);
        }
    }
    render() {
        for (let i = 0; i < this.characters.length; i++) {
            this.characters[i].render('Arial', 12, this.positions[i]);
        }
    }
    getCharacterCount() {
        return this.factory.getCount();
    }
}
// Usage
const editor = new TextEditor();
editor.write("Hello Flyweight Pattern", "Arial", 12);
console.log(`Character objects created: ${editor.getCharacterCount()}`);
editor.render();
/*
Character H created
Character e created
Character l created
Character o created
Character   created
Character F created
Character y created
Character w created
Character i created
Character g created
Character h created
Character t created
Character P created
Character a created
Character r created
Character n created
Character objects created: 16
Character H rendered with font Arial at size 12 in position (0, 20)
Character e rendered with font Arial at size 12 in position (10, 20)
Character l rendered with font Arial at size 12 in position (20, 20)
Character l rendered with font Arial at size 12 in position (30, 20)
Character o rendered with font Arial at size 12 in position (40, 20)
Character   rendered with font Arial at size 12 in position (50, 20)
Character F rendered with font Arial at size 12 in position (60, 20)
Character l rendered with font Arial at size 12 in position (70, 20)
Character y rendered with font Arial at size 12 in position (80, 20)
Character w rendered with font Arial at size 12 in position (90, 20)
Character e rendered with font Arial at size 12 in position (100, 20)
Character i rendered with font Arial at size 12 in position (110, 20)
Character g rendered with font Arial at size 12 in position (120, 20)
Character h rendered with font Arial at size 12 in position (130, 20)
Character t rendered with font Arial at size 12 in position (140, 20)
Character   rendered with font Arial at size 12 in position (150, 20)
Character P rendered with font Arial at size 12 in position (160, 20)
Character a rendered with font Arial at size 12 in position (170, 20)
Character t rendered with font Arial at size 12 in position (180, 20)
Character t rendered with font Arial at size 12 in position (190, 20)
Character e rendered with font Arial at size 12 in position (200, 20)
Character r rendered with font Arial at size 12 in position (210, 20)
Character n rendered with font Arial at size 12 in position (220, 20)
*/ 
