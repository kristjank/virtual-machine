import { Kernel } from "../contracts";

export class ConfigRepository extends Map<string, any> {
    public constructor(app: Kernel.IApplication, config: object) {
        super();

        for (const [key, value] of Object.entries(config)) {
            this.set(key, value);
        }
    }
}
