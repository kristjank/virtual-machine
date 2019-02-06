import { Kernel } from "../contracts";
import { InvalidConfigurationAdapter } from "../errors";
import { LocalAdapter, RemoteAdapter } from "./adapters";

export class ConfigFactory {
    public static make(app: Kernel.IApplication, adapter: string) {
        try {
            return new {
                local: LocalAdapter,
                remote: RemoteAdapter,
            }[adapter](app);
        } catch (error) {
            throw new InvalidConfigurationAdapter();
        }
    }
}
