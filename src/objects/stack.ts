import { IStack } from '../interfaces/stack.interface';

export class Stack<T> implements IStack<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("max Stack");
        }
        this.storage.push(item);
    }
  
    pop(): T | undefined {
        return this.storage.pop();
    }
  
    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }
  
    size(): number {
        return this.storage.length;
    }

    clear(): void {
        this.storage = [];
    }
}
  