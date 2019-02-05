import { app } from "@arkecosystem/core-kernel";
import { SnapshotManager } from "@arkecosystem/core-snapshots";
import { flags } from "@oclif/command";
import { setUpLite } from "../utils";
import { BaseCommand } from "./command";

export class RollbackCommand extends BaseCommand {
    public static description: string = "rollback chain to specified height";

    public static flags = {
        ...BaseCommand.flags,
        height: flags.integer({
            description: "block network height number to rollback",
            default: -1,
        }),
    };

    public async run(): Promise<void> {
        // tslint:disable-next-line:no-shadowed-variable
        const { flags } = this.parse(RollbackCommand);

        await setUpLite(flags);

        if (flags.height === -1) {
            app.logger.warn("Rollback height is not specified. Rolling back to last completed round.");
        }

        app.logger.info(
            `Starting the process of blockchain rollback to block height of ${flags.height.toLocaleString()}`,
        );

        await app.resolvePlugin<SnapshotManager>("snapshots").rollbackChain(flags.height);
    }
}
