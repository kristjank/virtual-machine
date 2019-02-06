import cosmiconfig from "cosmiconfig";
import { Kernel } from "../contracts";

export class LoadConfiguration {
    /**
     * Bootstrap the given application.
     */
    public async bootstrap(app: Kernel.IApplication): Promise<void> {
        await app.resolve("configLoader").loadConfiguration();
    }
}
