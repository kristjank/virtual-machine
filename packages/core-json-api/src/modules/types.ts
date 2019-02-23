import { serializer } from "../serializer";

export enum SerialiserType {
    Block = "block",
    Round = "round",
    Transaction = "transaction",
    Wallet = "wallet",
}

// Register 'article' type
serializer.register("wallet", {
    id: "id",
    links: {
        self(data) {
            return "/wallets/" + data.id;
        },
    },
    relationships: {
        blocks: {
            type: "block",
        },
        rounds: {
            type: "round",
        },
        transactions: {
            type: "transaction",
            links(data) {
                return {
                    self: "/wallets/" + data.id + "/relationships/transactions",
                    related: "/wallets/" + data.id + "/transactions",
                };
            },
        },
    },
    topLevelMeta(data, extraData) {
        return {
            requestId: extraData.id,
            count: extraData.count,
            total: data.length,
        };
    },
    topLevelLinks: {
        self: "/wallets",
    },
});

serializer.register("block", {
    id: "id",
    links: {
        self(data) {
            return "/blocks/" + data.id;
        },
    },
    relationships: {
        generator: {
            type: "wallet",
        },
        transactions: {
            type: "transaction",
            links(data) {
                return {
                    self: "/blocks/" + data.id + "/relationships/transactions",
                    related: "/blocks/" + data.id + "/transactions",
                };
            },
        },
    },
    topLevelMeta(data, extraData) {
        return {
            requestId: extraData.id,
            count: extraData.count,
            total: data.length,
        };
    },
    topLevelLinks: {
        self: "/blocks",
    },
});

serializer.register("round", {
    id: "id",
    links: {
        self(data) {
            return "/rounds/" + data.id;
        },
    },
    relationships: {
        forgers: {
            type: "wallet",
        },
        blocks: {
            type: "block",
            links(data) {
                return {
                    self: "/rounds/" + data.id + "/relationships/blocks",
                    related: "/rounds/" + data.id + "/blocks",
                };
            },
        },
    },
    topLevelMeta(data, extraData) {
        return {
            requestId: extraData.id,
            count: extraData.count,
            total: data.length,
        };
    },
    topLevelLinks: {
        self: "/rounds",
    },
});

serializer.register("transaction", {
    id: "id",
    links: {
        self(data) {
            return "/transactions/" + data.id;
        },
    },
    relationships: {
        block: {
            type: "block",
            links(data) {
                return {
                    self: "/transactions/" + data.id + "/relationships/block",
                    related: "/transactions/" + data.id + "/block",
                };
            },
        },
        sender: {
            type: "wallet",
            links(data) {
                return {
                    self: "/transactions/" + data.id + "/relationships/sender",
                    related: "/transactions/" + data.id + "/sender",
                };
            },
        },
        recipient: {
            type: "wallet",
            links(data) {
                return {
                    self: "/transactions/" + data.id + "/relationships/recipient",
                    related: "/transactions/" + data.id + "/recipient",
                };
            },
        },
    },
    topLevelMeta(data, extraData) {
        return {
            requestId: extraData.id,
            count: extraData.count,
            total: data.length,
        };
    },
    topLevelLinks: {
        self: "/transactions",
    },
});
