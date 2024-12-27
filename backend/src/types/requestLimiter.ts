import CircularList from "./circularList.ts";

export default class RequestLimiter {
    protected data = new Map<string, CircularList<number>>();
    protected readonly limitPeriod: number;
    protected readonly limitCount: number;

    constructor(limitPeriod: number, limitCount: number) {
        this.limitPeriod = limitPeriod;
        this.limitCount = limitCount;
    }

    check(u: string): boolean {
        if (!this.data.has(u)) {
            this.data.set(u, new CircularList(this.limitCount, 0));
        }

        const list = <CircularList<number>>this.data.get(u);
        const now = Date.now();

        return now - list.getNext() >= this.limitPeriod;
    }

    add(u: string) {
        if (!this.data.has(u)) {
            this.data.set(u, new CircularList(this.limitCount, 0));
        }

        const list = <CircularList<number>>this.data.get(u);

        list.setNext(Date.now());
    }

    checkAndAdd(u: string): boolean {
        const var1 = this.check(u);
        this.add(u);
        return var1;
    }
}
