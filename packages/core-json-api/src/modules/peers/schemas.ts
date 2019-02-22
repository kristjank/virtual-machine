import { pagination } from "../shared/schemas";

export const index: object = {
    query: {
        ...pagination,
        ...{
            ip: {
                type: "ip",
            },
            os: {
                type: "string",
            },
            status: {
                type: "string",
            },
            port: {
                type: "port",
            },
            version: {
                type: "string",
            },
            orderBy: {
                type: "string",
            },
        },
    },
};

export const show: object = {
    params: {
        ip: {
            type: "ip",
        },
    },
};
