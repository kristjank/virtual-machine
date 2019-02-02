import cosmiconfig from "cosmiconfig";
import { Kernel } from "../contracts";

export class LoadConfiguration {
    /**
     * Bootstrap the given application.
     */
    public async bootstrap(app: Kernel.IApplication): Promise<void> {
        try {
            const explorer = cosmiconfig(app.namespace(), {
                searchPlaces: [
                    app.configPath("config.js"),
                    app.configPath("config.json"),
                    app.configPath("config.yaml"),
                    app.configPath("config.yml"),
                ],
                stopDir: app.configPath(),
            });

            for (const [key, value] of Object.entries(explorer.searchSync().config)) {
                app.config(key, value);
            }
        } catch (error) {
            throw new Error("Unable to load the application configuration file.");
        }
    }
}
