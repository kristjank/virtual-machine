import { Kernel } from "../contracts";

export class ConfigRepository {
    private readonly repository: Map<string, any> = new Map<string, any>();

    public constructor(app: Kernel.IApplication, config: object) {
        for (const [key, value] of Object.entries(config)) {
            this.repository.set(key, value);
        }
    }

    public get(key: string): any {
        return this.repository.get(key);
    }

    public set(key: string, value: any): void {
        this.repository.set(key, value);
    }

    public has(key: string): boolean {
        return this.repository.has(key);
    }
}
