import { parseFileSync } from "envfile";
import { Kernel } from "../contracts";

export class LoadEnvironmentVariables {
    public async bootstrap(app: Kernel.IApplication): Promise<void> {
        await app.resolve("configLoader").loadEnvironmentVariables();
    }
}
