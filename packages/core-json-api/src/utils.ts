export function wrapResponse(data) {
    return {
        ...{ jsonapi: { version: "1.0" } },
        ...data,
    };
}
