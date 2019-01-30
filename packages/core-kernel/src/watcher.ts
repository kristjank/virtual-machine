import nsfw from "nsfw";
import { Kernel } from "./contracts";

interface FileEvent {
    action: number;
    directory: string;
    file: string;
}

export class Watcher {
    /**
     * Create a new watcher instance.
     */
    public constructor(readonly app: Kernel.IApplication) {}

    /**
     * Watch the configuration directory for changes.
     */
    public async watch(): Promise<void> {
        const configFiles = [".env", "config.yml"];

        const watcher = await nsfw(this.app.configPath(), (events: FileEvent[]) => {
            for (const event of events) {
                if (configFiles.includes(event.file) && event.action === nsfw.actions.MODIFIED) {
                    this.app.reboot();
                }
            }
        });

        await watcher.start();
    }
}
