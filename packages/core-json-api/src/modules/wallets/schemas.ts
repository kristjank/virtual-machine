import { pagination } from "../shared/schemas";

export const index: object = {
    query: {
        type: "object",
        properties: {
            ...pagination,
            ...{
                orderBy: {
                    type: "string",
                },
                address: {
                    $ref: "address",
                },
                publicKey: {
                    $ref: "publicKey",
                },
                secondPublicKey: {
                    $ref: "publicKey",
                },
                vote: {
                    $ref: "publicKey",
                },
                username: {
                    $ref: "username",
                },
                balance: { type: "integer" },
                voteBalance: {
                    $ref: "satoshi",
                },
                producedBlocks: {
                    $ref: "countable",
                },
                missedBlocks: {
                    $ref: "countable",
                },
            },
        },
    },
};

export const show: object = {
    params: {
        type: "object",
        properties: {
            id: {
                $ref: "walletId",
            },
        },
    },
};

export const transactions: object = {
    params: {
        type: "object",
        properties: {
            id: {
                $ref: "walletId",
            },
        },
    },
    query: {
        type: "object",
        properties: {
            ...pagination,
            ...{
                orderBy: {
                    type: "string",
                },
                id: {
                    $ref: "transactionId",
                },
                blockId: { $ref: "blockId" },
                type: {
                    $ref: "transactionType",
                },
                version: {
                    $ref: "transactionVersion",
                },
                senderPublicKey: {
                    $ref: "publicKey",
                },
                senderId: {
                    $ref: "address",
                },
                recipientId: {
                    $ref: "address",
                },
                ownerId: {
                    $ref: "address",
                },
                timestamp: {
                    $ref: "timestamp",
                },
                amount: {
                    $ref: "satoshi",
                },
                fee: {
                    $ref: "satoshi",
                },
                vendorFieldHex: {
                    $ref: "hex",
                },
            },
        },
    },
};

export const transactionsSent: object = {
    params: {
        type: "object",
        properties: {
            id: {
                $ref: "walletId",
            },
        },
    },
    query: {
        type: "object",
        properties: {
            ...pagination,
            ...{
                orderBy: {
                    type: "string",
                },
                id: {
                    $ref: "transactionId",
                },
                blockId: { $ref: "blockId" },
                type: {
                    $ref: "transactionType",
                },
                version: {
                    $ref: "transactionVersion",
                },
                recipientId: {
                    $ref: "address",
                },
                ownerId: {
                    $ref: "address",
                },
                timestamp: {
                    $ref: "timestamp",
                },
                amount: {
                    $ref: "satoshi",
                },
                fee: {
                    $ref: "satoshi",
                },
                vendorFieldHex: {
                    $ref: "hex",
                },
            },
        },
    },
};

export const transactionsReceived: object = {
    params: {
        type: "object",
        properties: {
            id: {
                $ref: "walletId",
            },
        },
    },
    query: {
        type: "object",
        properties: {
            ...pagination,
            ...{
                orderBy: {
                    type: "string",
                },
                id: {
                    $ref: "transactionId",
                },
                blockId: { $ref: "blockId" },
                type: {
                    $ref: "transactionType",
                },
                version: {
                    $ref: "transactionVersion",
                },
                senderPublicKey: {
                    $ref: "publicKey",
                },
                senderId: {
                    $ref: "address",
                },
                ownerId: {
                    $ref: "address",
                },
                timestamp: {
                    $ref: "timestamp",
                },
                amount: {
                    $ref: "satoshi",
                },
                fee: {
                    $ref: "satoshi",
                },
                vendorFieldHex: {
                    $ref: "hex",
                },
            },
        },
    },
};

export const votes: object = {
    params: {
        type: "object",
        properties: {
            id: {
                $ref: "walletId",
            },
        },
    },
    query: {
        type: "object",
        properties: pagination,
    },
};
