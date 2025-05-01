"use strict";
class OldCalculator {
    operate(a, b, operation) {
        switch (operation) {
            case 'add':
                return a + b;
            case 'sub':
                return a - b;
            default:
                return NaN;
        }
    }
}
class NewCalculator {
    add(a, b) {
        return a + b;
    }
    subtract(a, b) {
        return a - b;
    }
    multiply(a, b) {
        return a * b;
    }
    divide(a, b) {
        return a / b;
    }
}
// Adapter
class CalculatorAdapter {
    constructor() {
        this.newCalculator = new NewCalculator();
    }
    operate(a, b, operation) {
        switch (operation) {
            case 'add':
                return this.newCalculator.add(a, b);
            case 'sub':
                return this.newCalculator.subtract(a, b);
            case 'mult':
                return this.newCalculator.multiply(a, b);
            case 'div':
                return this.newCalculator.divide(a, b);
            default:
                return NaN;
        }
    }
}
// Usage
const oldCalc = new OldCalculator();
console.log(oldCalc.operate(10, 5, 'add')); // 15
const newCalc = new NewCalculator();
console.log(newCalc.add(10, 5)); // 15
const adaptedCalc = new CalculatorAdapter();
console.log(adaptedCalc.operate(10, 5, 'add')); // 15
console.log(adaptedCalc.operate(10, 5, 'mult')); // 50
