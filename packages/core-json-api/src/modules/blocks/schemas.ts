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
                    $ref: "blockId",
                },
                version: {
                    $ref: "transactionVersion",
                },
                timestamp: {
                    $ref: "timestamp",
                },
                previousBlock: {
                    type: "integer",
                },
                height: {
                    $ref: "blockHeight",
                },
                numberOfTransactions: {
                    $ref: "countable",
                },
                totalAmount: {
                    $ref: "satoshi",
                },
                totalFee: {
                    $ref: "satoshi",
                },
                reward: {
                    $ref: "satoshi",
                },
                payloadLength: {
                    type: "integer",
                },
                payloadHash: {
                    $ref: "hex",
                },
                generatorPublicKey: {
                    $ref: "publicKey",
                },
                blockSignature: {
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
                $ref: "blockId",
            },
        },
    },
};

export const transactions: object = {
    params: {
        type: "object",
        properties: {
            id: { $ref: "blockId" },
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
                    $ref: "publicKey",
                },
                blockId: {
                    $ref: "blockId",
                },
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
