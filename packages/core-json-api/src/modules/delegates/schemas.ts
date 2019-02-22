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
};

export const show: object = {
    params: {
        id: { type: "delegateId" },
    },
};

export const voters: object = {
    params: {
        id: { type: "delegateId" },
    },
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
};

export const blocks: object = {
    params: {
        id: { type: "delegateId" },
    },
    query: {
        ...pagination,
        ...{
            orderBy: {
                type: "string",
            },
            id: { type: "blockId" },
            version: {
                type: "integer",
                minimum: 0,
            },
            timestamp: {
                type: "integer",
                minimum: 0,
            },
            previousBlock: { type: "blockId" },
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
                minimum: 0,
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

export const voterBalances: object = {
    params: {
        id: { type: "delegateId" },
    },
};
