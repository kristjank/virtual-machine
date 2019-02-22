import { IServer } from "../../interfaces";
import * as handlers from "./handlers";
import * as schemas from "./schemas";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/delegates",
        handler: handlers.index,
        options: {
            plugins: {
                validator: schemas.index,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/delegates/{id}",
        handler: handlers.show,
        options: {
            plugins: {
                validator: schemas.show,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/delegates/{id}/blocks",
        handler: handlers.blocks,
        options: {
            plugins: {
                validator: schemas.blocks,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/delegates/{id}/voters",
        handler: handlers.voters,
        options: {
            plugins: {
                validator: schemas.voters,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/delegates/{id}/voters/balances",
        handler: handlers.voterBalances,
        options: {
            plugins: {
                validator: schemas.voterBalances,
            },
        },
    });
}
