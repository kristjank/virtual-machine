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

export const store: object = {
    payload: {
        type: "object",
        properties: {
            transactions: { type: "array" },
        },
    },
};

export const show: object = {
    params: {
        type: "object",
        properties: {
            id: { $ref: "transactionId" },
        },
    },
};

export const unconfirmed: object = {
    query: {
        type: "object",
        properties: pagination,
    },
};

export const showUnconfirmed: object = {
    params: {
        type: "object",
        properties: {
            id: { $ref: "transactionId" },
        },
    },
};
