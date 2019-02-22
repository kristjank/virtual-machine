import { unsupportedMediaType } from "boom";
import { IRequest, IResponse, IServer } from "../interfaces";

export const plugin = {
    async register(server: IServer): Promise<void> {
        server.ext({
            type: "onPreHandler",
            async method(request: IRequest, h: IResponse) {
                if (request.headers.accept.indexOf("application/vnd.api+json") === -1) {
                    throw unsupportedMediaType(
                        'JSON:API requires use of the "application/vnd.api+json" media type for exchanging data',
                    );
                }

                return h.continue;
            },
        });
    },
    name: "enforce-content-type",
    version: "1.0.0",
};
