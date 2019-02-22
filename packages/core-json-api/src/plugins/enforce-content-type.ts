import { notAcceptable, unsupportedMediaType } from "boom";
import { fromString } from "media-type";
import { IRequest, IResponse, IServer } from "../interfaces";

const errorMessage: string = 'JSON:API requires use of the "application/vnd.api+json" media type';

function handleAcceptHeader(request: IRequest) {
    if (request.headers.accept.indexOf("application/vnd.api+json") === -1) {
        throw notAcceptable(errorMessage);
    }
}

function handleContentTypeHeader(request: IRequest) {
    const contentMedia = fromString(request.headers["content-type"]);

    if (contentMedia.parameters.charset === "UTF-8") {
        delete contentMedia.parameters.charset;
    }

    const hasInvalidType = contentMedia.type !== "application";
    const hasInvalidSubType = contentMedia.subtype !== "vnd.api";
    const hasInvalidParameters = Object.keys(contentMedia.parameters).length > 0;

    if (hasInvalidType || hasInvalidSubType || hasInvalidParameters) {
        throw unsupportedMediaType(errorMessage);
    }
}

export const plugin = {
    async register(server: IServer): Promise<void> {
        server.ext({
            type: "onPreHandler",
            async method(request: IRequest, h: IResponse) {
                if (request.headers["content-type"]) {
                    handleContentTypeHeader(request);
                } else if (request.headers.accept) {
                    handleAcceptHeader(request);
                } else {
                    throw unsupportedMediaType(errorMessage);
                }

                return h.continue;
            },
        });
    },
    name: "enforce-content-type",
    version: "1.0.0",
};
