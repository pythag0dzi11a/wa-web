import NodeCache from "node-cache";

export class LazyCache<T, P extends { toString: () => string } | undefined> {
    protected cache: NodeCache;

    /**
     *
     * @param provider Provider function
     * @param ttl Time to live in seconds
     */
    constructor(
        protected provider: (...key: P extends undefined ? [] : [P]) => Promise<T>,
        ttl?: number
    ) {
        this.cache = new NodeCache({ stdTTL: ttl });
    }

    async get(...key: P extends undefined ? [] : [P]): Promise<T> {
        const value = this.cache.get(key.length ? key[0].toString() : "") as T;
        if (value) {
            return value;
        }
        const newValue = await this.provider(...key);
        this.cache.set(key.length ? key[0].toString() : "", newValue);
        return newValue;
    }

    delete(...key: P extends undefined ? [] : [P]) {
        this.cache.del(key.length ? key[0].toString() : "");
    }
}
