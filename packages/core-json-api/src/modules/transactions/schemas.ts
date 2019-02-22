import { pagination } from "../shared/schemas";

export const index: object = {
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

export const store: object = {
    payload: {
        transactions: { type: "array" },
    },
};

export const show: object = {
    params: {
        id: { type: "transactionId" },
    },
};

export const unconfirmed: object = {
    query: pagination,
};

export const showUnconfirmed: object = {
    params: {
        id: { type: "transactionId" },
    },
};
