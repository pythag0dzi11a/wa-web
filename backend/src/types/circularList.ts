export default class CircularList<T> {
    protected readonly data: T[];
    protected readonly size: number;
    protected p: number;

    constructor(size: number, init?: T | (() => T)) {
        this.size = size;
        this.data = new Array(size);
        this.p = 0;
        if (init != null) {
            if (typeof init === "function") {
                for (let i = 0; i < size; i++) {
                    this.data[i] = (<() => T>init)();
                }
            } else {
                for (let i = 0; i < size; i++) {
                    this.data[i] = init;
                }
            }
        }
    }

    getNext(): T {
        this.p = this.p % this.size;
        return this.data[this.p];
    }

    setNext(value: T) {
        this.data[this.p] = value;
        this.p = (this.p + 1) % this.size;
    }
}
