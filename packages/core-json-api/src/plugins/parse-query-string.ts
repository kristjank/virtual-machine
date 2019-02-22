import * as Hapi from "hapi";
import { IRequest, IServer } from "../interfaces";

function fields(request: IRequest) {
    const pattern = /fields\[(.*?)\]/;

    const matches = [];
    for (const [key, value] of Object.entries(request.query)) {
        if (RegExp(pattern).test(key)) {
            matches.push({
                type: key.match(/\[(.*?)\]/)[1],
                // @ts-ignore
                fields: value.split(","),
            });
        }
    }

    return matches;
}

function filter(request: IRequest) {
    const pattern = /filter\[(.*?)\]/;

    const matches = [];
    for (const [key, value] of Object.entries(request.query)) {
        if (RegExp(pattern).test(key)) {
            matches.push({
                field: key.match(/\[(.*?)\]/)[1],
                value,
            });
        }
    }

    return matches;
}

function include(request: IRequest) {
    const parameters = request.query.include || "";

    // @ts-ignore
    return parameters.split(",").map(parameter => ({
        relationship: parameter,
    }));
}

function pagination(request: IRequest) {
    const allowed = ["number", "size", "offset", "limit", "cursor"];
    const pattern = /page\[(.*?)\]/;

    const matches = {};
    for (const [key, value] of Object.entries(request.query)) {
        if (RegExp(pattern).test(key)) {
            const parameter = key.match(/\[(.*?)\]/)[1];

            if (allowed.includes(parameter)) {
                matches[parameter] = +value;
            }
        }
    }

    return matches;
}

function sort(request: IRequest) {
    const parameters = request.query.sort || "";

    // @ts-ignore
    return parameters.split(",").map(parameter => ({
        field: parameter.startsWith("-") ? parameter.substr(1) : parameter,
        ascending: !parameter.startsWith("-"),
    }));
}

export const plugin = {
    async register(server: IServer): Promise<void> {
        server.ext({
            type: "onPreHandler",
            async method(request: IRequest) {
                request.jsonapi = {
                    include: include(request),
                    sort: sort(request),
                    filter: filter(request),
                    pagination: pagination(request),
                    fields: fields(request),
                };
            },
        });
    },
    name: "parse-query-string",
    version: "1.0.0",
};
