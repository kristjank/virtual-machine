import { pagination } from "../shared/schemas";

export const index: object = {
    query: {
        type: "object",
        properties: {
            ...pagination,
            ...{
                ip: {
                    $ref: "ip",
                },
                os: {
                    type: "string",
                },
                status: {
                    type: "integer",
                },
                port: {
                    $ref: "port",
                },
                version: {
                    type: "string",
                },
                orderBy: {
                    type: "string",
                },
            },
        },
    },
};

export const show: object = {
    params: {
        type: "object",
        properties: {
            ip: {
                $ref: "ip",
            },
        },
    },
};
