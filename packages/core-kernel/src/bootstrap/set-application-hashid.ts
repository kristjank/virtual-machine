import { execSync } from "child_process";
import { Kernel } from "../contracts";

export class SetApplicationHashid {
    /**
     * Register all of the configured providers.
     */
    public async bootstrap(app: Kernel.IApplication): Promise<void> {
        let hashid;

        try {
            hashid = execSync("git rev-parse --short=8 HEAD")
                .toString()
                .trim();
        } catch (e) {
            hashid = "unknown";
        }

        app.bind("app.hashid", hashid);
    }
}
