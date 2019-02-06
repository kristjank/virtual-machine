import cosmiconfig from "cosmiconfig";
import { parseFileSync } from "envfile";
import { Kernel } from "../../contracts";
import { InvalidApplicationConfiguration, InvalidEnvironmentConfiguration } from "../../errors";
import { BaseAdapter } from "./base";

export class LocalAdapter extends BaseAdapter {
    public async loadConfiguration(): Promise<void> {
        try {
            const explorer = cosmiconfig(this.app.namespace(), {
                searchPlaces: [
                    this.app.configPath("config.js"),
                    this.app.configPath("config.json"),
                    this.app.configPath("config.yaml"),
                    this.app.configPath("config.yml"),
                ],
                stopDir: this.app.configPath(),
            });

            for (const [key, value] of Object.entries(explorer.searchSync().config)) {
                this.app.config(key, value);
            }
        } catch (error) {
            throw new InvalidApplicationConfiguration();
        }
    }

    public async loadEnvironmentVariables(): Promise<void> {
        try {
            const config = parseFileSync(this.app.environmentFile());

            for (const [key, value] of Object.entries(config)) {
                // @ts-ignore
                process.env[key] = value;
            }
        } catch (error) {
            throw new InvalidEnvironmentConfiguration();
        }
    }
}
