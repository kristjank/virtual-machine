import { pagination } from "../shared/schemas";

export const index: object = {
    query: {
        ...pagination,
        ...{
            orderBy: {
                type: "string",
            },
            id: {
                type: "integer",
            },
            version: {
                type: "integer",
                minimum: 0,
            },
            timestamp: {
                type: "integer",
                minimum: 0,
            },
            previousBlock: {
                type: "integer",
            },
            height: {
                type: "integer",
            },
            numberOfTransactions: {
                type: "integer",
                minimum: 0,
            },
            totalAmount: {
                type: "integer",
                minimum: 0,
            },
            totalFee: {
                type: "integer",
                minimum: 0,
            },
            reward: {
                type: "integer",
                minimum: 0,
            },
            payloadLength: {
                type: "integer",
            },
            payloadHash: {
                type: "hex",
            },
            generatorPublicKey: {
                type: "publicKey",
            },
            blockSignature: {
                type: "hex",
            },
        },
    },
};

export const show: object = {
    params: {
        id: {
            type: "integer",
        },
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
                type: "publicKey",
            },
            blockId: {
                type: "blockId",
            },
            type: {
                type: "integer",
                minimum: 0,
            },
            version: {
                type: "integer",
                minimum: 0,
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
