import AJV from "ajv";
import { badData } from "boom";
import Hapi from "hapi";
import { isValid } from "ipaddr.js";

export const schemas = {
    hex: {
        $id: "hex",
        type: "string",
        pattern: "^[0123456789A-Fa-f]+$",
    },

    base58: {
        $id: "base58",
        type: "string",
        pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$",
    },

    numericString: {
        $id: "numericString",
        type: "string",
        pattern: "^[0-9]+$",
    },

    alphanumeric: {
        $id: "alphanumeric",
        type: "string",
        pattern: "^[a-zA-Z0-9]+$",
    },

    transactionId: {
        $id: "transactionId",
        allOf: [{ minLength: 64, maxLength: 64 }, { $ref: "alphanumeric" }],
    },

    networkByte: {
        $id: "networkByte",
        network: true,
    },

    address: {
        $id: "address",
        allOf: [{ minLength: 34, maxLength: 34 }, { $ref: "base58" }],
    },

    blockId: {
        $id: "blockId",
        $ref: "numericString",
    },

    publicKey: {
        $id: "publicKey",
        allOf: [{ minLength: 66, maxLength: 66 }, { $ref: "hex" }, { transform: ["toLowerCase"] }],
    },

    walletVote: {
        $id: "walletVote",
        allOf: [{ type: "string", pattern: "^[+|-][a-zA-Z0-9]{66}$" }, { transform: ["toLowerCase"] }],
    },

    username: {
        $id: "username",
        allOf: [
            { type: "string", pattern: "^[a-z0-9!@$&_.]+$" },
            { minLength: 1, maxLength: 20 },
            { transform: ["toLowerCase"] },
        ],
    },

    walletId: {
        $id: "walletId",
        anyOf: [{ $ref: "address" }, { $ref: "publicKey" }, { $ref: "username" }],
    },

    satoshi: {
        $id: "satoshi",
        type: "integer",
        minimum: 0,
    },

    transactionType: {
        $id: "transactionType",
        type: "integer",
        minimum: 0,
    },

    transactionVersion: {
        $id: "transactionVersion",
        type: "integer",
        minimum: 0,
    },

    timestamp: {
        $id: "timestamp",
        type: "integer",
        minimum: 0,
    },

    countable: {
        $id: "countable",
        type: "integer",
        minimum: 0,
    },

    blockHeight: {
        $id: "blockHeight",
        type: "integer",
        minimum: 1,
    },

    port: {
        $id: "port",
        type: "integer",
        minimum: 1,
        maximum: 65535,
    },
};

export const plugin = {
    async register(server: Hapi.Server): Promise<void> {
        const ajv = new AJV({
            $data: true,
            schemas,
            coerceTypes: true,
            extendRefs: true,
            allErrors: true,
        });

        ajv.addFormat("ip", {
            type: "string",
            validate: isValid,
        });

        server.ext({
            type: "onPreHandler",
            method: (request, h) => {
                // @ts-ignore
                const config = request.route.settings.plugins.validator || {};

                for (const type of ["headers", "params", "query"]) {
                    if (config[type]) {
                        config[type].additionalProperties = false;

                        if (!ajv.validate(config[type], request[type])) {
                            return h
                                .response({
                                    errors: ajv.errors.map(error => {
                                        const source: Record<string, string> = { pointer: error.schemaPath };

                                        if (error.dataPath) {
                                            source.parameter = error.dataPath;
                                        }

                                        return {
                                            status: 422,
                                            source,
                                            title: error.keyword,
                                            detail: error.message,
                                        };
                                    }),
                                })
                                .takeover();
                        }
                    }
                }

                return h.continue;
            },
        });
    },
    name: "validator",
    version: "1.0.0",
};
