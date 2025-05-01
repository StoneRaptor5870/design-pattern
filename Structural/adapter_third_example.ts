// Old interface
interface IOldCalculator {
    operate(a: number, b: number, operation: string): number;
}

// New interface
interface INewCalculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
}

class OldCalculator implements IOldCalculator {
    operate(a: number, b: number, operation: string): number {
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

class NewCalculator implements INewCalculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        return a / b;
    }
}

// Adapter
class CalculatorAdapter implements IOldCalculator {
    private newCalculator: INewCalculator;

    constructor() {
        this.newCalculator = new NewCalculator();
    }

    operate(a: number, b: number, operation: string): number {
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