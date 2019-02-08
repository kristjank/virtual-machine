import { Support } from "../../src";

export class ServiceProvider extends Support.AbstractServiceProvider {
    public async register(): Promise<void> {
        this.app.bind(this.getName(), true);
    }

    public async dispose(): Promise<void> {
        this.app.bind(this.getName(), false);
    }

    public getManifest(): Record<string, any> {
        return {
            name: "@dummy/core-api",
            version: "1.0.0",
        };
    }
}
