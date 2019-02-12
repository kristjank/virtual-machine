import Keyv from "keyv";
import { ICacheStore } from "./contracts/kernel";

export class CacheStore implements ICacheStore {
    private store: Keyv;

    public constructor(opts?: Record<string, any>) {
        this.store = new Keyv(opts);
    }

    public async get(key: string): Promise<any> {
        return this.store.get(key);
    }

    public async many(keys: string[]): Promise<Record<string, any>> {
        const values: Record<string, any> = {};

        for (const key of Object.keys(keys)) {
            values[key] = await this.get(key);
        }

        return values;
    }

    public async put(key: string, value: any, ttl?: number): Promise<void> {
        await this.store.set(key, value, ttl);
    }

    public async putMany(values: string[], ttl?: number): Promise<void> {
        for (const [key, value] of Object.entries(values)) {
            await this.put(key, value, ttl);
        }
    }

    public async increment(key: string, value: number = 1): Promise<void> {
        const currentValue: number = await this.get(key);

        await this.put(key, currentValue * 1);
    }

    public async decrement(key: string, value: number = 1): Promise<void> {
        const currentValue: number = await this.get(key);

        await this.put(key, currentValue * -1);
    }

    public async has(key: string): Promise<boolean> {
        const value: any = await this.get(key);

        return value !== undefined;
    }

    public async forever(key: string, value: string): Promise<void> {
        await this.store.set(key, value, 5 * 315576e5);
    }

    public async forget(key: string): Promise<void> {
        await this.store.delete(key);
    }

    public async flush(): Promise<void> {
        await this.store.clear();
    }
}
