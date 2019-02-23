import { IRequest, IResponse, IServer } from "../interfaces";
import { serializer } from "../serializer";

export const plugin = {
    async register(server: IServer): Promise<void> {
        server.ext({
            type: "onPreResponse",
            async method(request: IRequest, h: IResponse) {
                // @ts-ignore
                request.response.source = serializer.serialize(
                    // @ts-ignore
                    request.route.settings.plugins.serializer,
                    // @ts-ignore
                    request.response.source,
                    { id: request.info.id },
                );

                return h.continue;
            },
        });
    },
    name: "response-serializer",
    version: "1.0.0",
};
