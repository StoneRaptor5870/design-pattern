"use strict";
class Singleton {
    constructor() {
        this.value = Math.random();
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    getValue() {
        return this.value;
    }
}
Singleton.instance = null;
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
console.log(singleton1.getValue() === singleton2.getValue()); // true
