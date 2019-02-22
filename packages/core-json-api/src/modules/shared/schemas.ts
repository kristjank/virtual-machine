export const pagination: object = {
    querystring: {
        page: {
            type: "integer",
        },
        offset: {
            type: "integer",
            minimum: 0,
        },
        limit: {
            type: "integer",
            minimum: 0,
            maximum: 100,
        },
    },
};
