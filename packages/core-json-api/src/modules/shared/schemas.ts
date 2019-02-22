export const pagination: object = {
    // Paeg Strategy
    "page[number]": {
        type: "integer",
    },
    "page[size]": {
        type: "integer",
        minimum: 0,
        maximum: 100,
    },
    // Offset Strategy
    "page[offset]": {
        type: "integer",
        minimum: 0,
    },
    "page[limit]": {
        type: "integer",
        minimum: 0,
        maximum: 100,
    },
    // Cursor Strategy
    "page[cursor]": {
        type: "integer",
        minimum: 0,
    },
};
