import { IServer } from "../interfaces";
import * as Blockchain from "./blockchain";
import * as Blocks from "./blocks";
import * as Delegates from "./delegates";
import * as Node from "./node";
import * as Peers from "./peers";
import * as Transactions from "./transactions";
import * as Votes from "./votes";
import * as Wallets from "./wallets";

export = {
    async register(server: IServer): Promise<void> {
        [Blockchain, Blocks, Delegates, Node, Peers, Transactions, Votes, Wallets].forEach(module =>
            module.register(server),
        );
    },
    name: "modules",
    version: "1.0.0",
};
