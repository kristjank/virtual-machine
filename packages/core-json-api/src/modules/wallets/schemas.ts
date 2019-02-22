import { pagination } from "../shared/schemas";

export const index: object = {
    query: {
        ...pagination,
        ...{
            orderBy: {
                type: "string",
            },
            address: {
                type: "address",
            },
            publicKey: {
                type: "publicKey",
            },
            secondPublicKey: {
                type: "publicKey",
            },
            vote: {
                type: "publicKey",
            },
            username: {
                type: "string",
            },
            balance: { type: "integer" },
            voteBalance: {
                type: "integer",
                minimum: 0,
            },
            producedBlocks: {
                type: "integer",
                minimum: 0,
            },
            missedBlocks: {
                type: "integer",
                minimum: 0,
            },
        },
    },
};

export const show: object = {
    params: {
        type: "string",
    },
};

export const transactions: object = {
    params: {
        type: "string",
    },
    query: {
        ...pagination,
        ...{
            orderBy: {
                type: "string",
            },
            id: {
                type: "transactionId",
            },
            blockId: { type: "blockId" },
            type: {
                type: "integer",
                minimum: 0,
            },
            version: {
                type: "integer",
            },
            senderPublicKey: {
                type: "publicKey",
            },
            senderId: {
                type: "address",
            },
            recipientId: {
                type: "address",
            },
            ownerId: {
                type: "address",
            },
            timestamp: {
                type: "integer",
                minimum: 0,
            },
            amount: {
                type: "integer",
                minimum: 0,
            },
            fee: {
                type: "integer",
                minimum: 0,
            },
            vendorFieldHex: {
                type: "hex",
            },
        },
    },
};

export const transactionsSent: object = {
    params: {
        type: "string",
    },
    query: {
        ...pagination,
        ...{
            orderBy: {
                type: "string",
            },
            id: {
                type: "transactionId",
            },
            blockId: { type: "blockId" },
            type: {
                type: "integer",
                minimum: 0,
            },
            version: {
                type: "integer",
            },
            recipientId: {
                type: "address",
            },
            ownerId: {
                type: "address",
            },
            timestamp: {
                type: "integer",
                minimum: 0,
            },
            amount: {
                type: "integer",
                minimum: 0,
            },
            fee: {
                type: "integer",
                minimum: 0,
            },
            vendorFieldHex: {
                type: "hex",
            },
        },
    },
};

export const transactionsReceived: object = {
    params: {
        type: "string",
    },
    query: {
        ...pagination,
        ...{
            orderBy: {
                type: "string",
            },
            id: {
                type: "transactionId",
            },
            blockId: { type: "blockId" },
            type: {
                type: "integer",
                minimum: 0,
            },
            version: {
                type: "integer",
            },
            senderPublicKey: {
                type: "publicKey",
            },
            senderId: {
                type: "address",
            },
            ownerId: {
                type: "address",
            },
            timestamp: {
                type: "integer",
                minimum: 0,
            },
            amount: {
                type: "integer",
                minimum: 0,
            },
            fee: {
                type: "integer",
                minimum: 0,
            },
            vendorFieldHex: {
                type: "hex",
            },
        },
    },
};

export const votes: object = {
    params: {
        id: { type: "string" },
    },
    query: pagination,
};
