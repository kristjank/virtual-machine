import { configManager, HashAlgorithms, NetworkManager } from "@arkecosystem/crypto";
import { Kernel } from "../contracts";

export class LoadCryptography {
    public async bootstrap(app: Kernel.IApplication): Promise<void> {
        const config: any = NetworkManager.findByName(app.network() as any);

        this.configure(app, config);

        this.calculateMilestoneHash(app, config.milestones);
    }

    private configure(app: Kernel.IApplication, config: any): void {
        configManager.setConfig(config);

        app.bind("crypto.network", configManager.all());
        app.bind("crypto.exceptions", configManager.get("exceptions"));
        app.bind("crypto.milestones", configManager.get("milestones"));
        app.bind("crypto.genesisBlock", configManager.get("genesisBlock"));
    }

    private calculateMilestoneHash(app: Kernel.IApplication, milestones: any): void {
        const milestonesBuffer = Buffer.from(JSON.stringify(milestones));

        app.bind(
            "app.milestoneHash",
            HashAlgorithms.sha256(milestonesBuffer)
                .slice(0, 8)
                .toString("hex"),
        );
    }
}
