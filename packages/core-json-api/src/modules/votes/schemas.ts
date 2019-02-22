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
            blockId: {
                type: "blockId",
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

export const show: object = {
    params: {
        id: {
            type: "transactionId",
        },
    },
};
