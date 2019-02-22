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
                    type: "username",
                },
                balance: {
                    type: "integer",
                    minimum: 0,
                },
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
    },
};

export const show: object = {
    params: {
        type: "object",
        properties: {
            id: { type: "delegateId" },
        },
    },
};

export const voters: object = {
    params: {
        type: "object",
        properties: {
            id: { type: "delegateId" },
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
                    type: "username",
                },
                balance: {
                    type: "integer",
                    minimum: 0,
                },
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
    },
};

export const blocks: object = {
    params: {
        type: "object",
        properties: {
            id: { type: "delegateId" },
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
                id: { $ref: "blockId" },
                version: {
                    $ref: "transactionVersion",
                },
                timestamp: {
                    $ref: "timestamp",
                },
                previousBlock: { $ref: "blockId" },
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
                    minimum: 0,
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

export const voterBalances: object = {
    params: {
        type: "object",
        properties: {
            id: { type: "delegateId" },
        },
    },
};
