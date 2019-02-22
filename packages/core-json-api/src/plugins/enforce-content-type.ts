import { unsupportedMediaType } from "boom";
import { IServer } from "../interfaces";

export const plugin = {
    async register(server: IServer): Promise<void> {
        server.ext({
            type: "onPreHandler",
            async method(request, h) {
                if (request.headers.accept.indexOf("application/vnd.api+json") === -1) {
                    throw unsupportedMediaType();
                }
            },
        });
    },
    name: "enforce-content-type",
    version: "1.0.0",
};
