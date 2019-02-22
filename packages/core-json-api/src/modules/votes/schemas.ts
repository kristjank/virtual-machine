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
                blockId: {
                    $ref: "blockId",
                },
                version: {
                    type: "integer",
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

export const show: object = {
    params: {
        type: "object",
        properties: {
            id: {
                $ref: "transactionId",
            },
        },
    },
};
