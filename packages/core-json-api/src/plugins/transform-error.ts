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
                if (request.response.isBoom) {
                    const { response } = request;
                    // @ts-ignore
                    const { output } = response;

                    output.payload = wrapResponse({
                        errors: [
                            {
                                status: output.statusCode,
                                title: output.payload.error,
                                detail: output.payload.message,
                            },
                        ],
                        // @TODO: support additional meta information
                        meta: { id: request.info.id },
                    });

                    // @ts-ignore
                    if (response.data && output.statusCode === 500) {
                        // @ts-ignore
                        request.log(
                            "error",
                            response.data instanceof Buffer ? response.data.toString() : response.data,
                        );
                    }

                    setHeader(output);
                }

                return h.continue;
            },
        });
    },
    name: "transform-error",
    version: "1.0.0",
};
