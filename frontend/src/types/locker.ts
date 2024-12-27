import { isPromiseResolved } from "@/utils/promise.ts";

export default class Locker {
    protected static locks: Map<string, Promise<void>> = new Map();
    protected promise: Promise<void>;
    protected resolver: Function;

    protected constructor() {
        this.promise = new Promise((r) => {
            r();
        });
        this.resolver = () => {};
    }

    /**
     * acquire a lock
     * @param key identifier of the lock
     * @param timeout max lock holding time (millisecond)
     */
    static async lock(key: string | string[], timeout?: number) {
        if (!Array.isArray(key)) {
            key = [key];
        }
        const p0 = key.map((key) => Locker.locks.get(key));
        const lock = new Locker();
        lock.promise = new Promise<void>((resolver) => {
            lock.resolver = resolver;
        });
        key.forEach((key) => {
            Locker.locks.set(key, lock.promise);
        });
        if (p0) {
            await Promise.all(p0);
        }
        if (timeout) {
            const e = new Error("LockTimeout");
            const resolver = lock.resolver;
            const t = setTimeout(() => {
                resolver();
                throw e;
            }, timeout);
            const tWarning = setTimeout(() => {
                console.warn(
                    `LockTimeoutWarning, key: ${key.length == 1 ? key[0] : JSON.stringify(key)}`
                );
            }, 10 * 1000);
            lock.resolver = () => {
                clearTimeout(t);
                clearTimeout(tWarning);
                resolver();
            };
        } else {
            const resolver = lock.resolver;
            const tWarning = setTimeout(() => {
                console.warn(
                    `LockTimeoutWarning, key: ${key.length == 1 ? key[0] : JSON.stringify(key)}`
                );
            }, 10 * 1000);
            lock.resolver = () => {
                clearTimeout(tWarning);
                resolver();
            };
        }
        return lock;
    }

    /**
     * acquire a lock, throw LockAcquireFailed if lock is acquired in another thread
     * @param key identifier of the lock
     * @param timeout max lock holding time (millisecond)
     */
    static async lockOrThrow(key: string | string[], timeout?: number) {
        if (!Array.isArray(key)) {
            key = [key];
        }
        for (const k of key) {
            const p0 = Locker.locks.get(k);
            if (p0) {
                if (await isPromiseResolved(p0)) {
                    Locker.locks.delete(k);
                } else {
                    throw new Error(`LockAcquireFailed: ${k}`);
                }
            }
        }
        return Locker.lock(key, timeout);
    }

    /**
     * check if lock is acquired
     * @param key
     */
    static async locked(key: string | string[]) {
        if (!Array.isArray(key)) {
            key = [key];
        }
        for (const k of key) {
            const p0 = Locker.locks.get(k);
            if (p0) {
                if (await isPromiseResolved(p0)) {
                    Locker.locks.delete(k);
                } else {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * do func with lock
     * @param key
     * @param func
     */
    static async withLock(key: string | string[], func: () => Promise<void>) {
        const lock = await Locker.lock(key);
        try {
            await func();
        } finally {
            lock.unlock();
        }
    }

    /**
     * do with lock or wait(do nothing)
     * @param key
     * @param func
     */
    static async withLockOrWait(key: string | string[], func: () => Promise<void>) {
        if (await Locker.locked(key)) {
            return (await Locker.lock(key)).unlock();
        }

        return Locker.withLock(key, func);
    }

    unlock() {
        this.resolver();
    }
}
