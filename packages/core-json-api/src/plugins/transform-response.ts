import { IRequest, IResponse, IServer } from "../interfaces";
import { wrapResponse } from "../utils";

function setHeader(value) {
    const header = "application/vnd.api+json";
    value.headers["content-type"] = header;
    value.headers.accept = header;
}

export const plugin = {
    async register(server: IServer): Promise<void> {
        server.ext({
            type: "onPreResponse",
            async method(request: IRequest, h: IResponse) {
                if (request.method === "options") {
                    return h.continue;
                }

                // @ts-ignore
                if (!request.response.isBoom) {
                    const { response } = request;

                    // @ts-ignore
                    if (response.source) {
                        // @ts-ignore
                        if (response.source.links || response.source.data) {
                            // @ts-ignore
                            response.source = wrapResponse(response.source);
                        } else {
                            // @ts-ignore
                            response.source = wrapResponse({ data: response.source });
                        }

                        // @ts-ignore
                        response.source.meta = { ...response.source.meta, id: request.info.id };
                    }

                    setHeader(response);
                }

                return h.continue;
            },
        });
    },
    name: "transform-response",
    version: "1.0.0",
};
