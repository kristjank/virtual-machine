import { IServer } from "../../interfaces";
import * as handlers from "./handlers";
import * as schemas from "./schemas";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/transactions",
        handler: handlers.index,
        options: {
            validate: schemas.index,
        },
    });

    server.route({
        method: "POST",
        path: "/transactions",
        handler: handlers.store,
        options: {
            validate: schemas.store,
            plugins: {
                pagination: {
                    enabled: false,
                },
            },
        },
    });

    server.route({
        method: "GET",
        path: "/transactions/{id}",
        handler: handlers.show,
        options: {
            validate: schemas.show,
        },
    });

    server.route({
        method: "GET",
        path: "/transactions/unconfirmed",
        handler: handlers.unconfirmed,
        options: {
            validate: schemas.unconfirmed,
        },
    });

    server.route({
        method: "GET",
        path: "/transactions/unconfirmed/{id}",
        handler: handlers.showUnconfirmed,
        options: {
            validate: schemas.showUnconfirmed,
        },
    });

    server.route({
        method: "GET",
        path: "/transactions/types",
        handler: handlers.types,
    });

    server.route({
        method: "GET",
        path: "/transactions/fees",
        handler: handlers.fees,
    });
}
