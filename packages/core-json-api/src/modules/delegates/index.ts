import { IServer } from "../../interfaces";
import * as handlers from "./handlers";
import * as schemas from "./schemas";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/delegates",
        handler: handlers.index,
        options: {
            validate: schemas.index,
        },
    });

    server.route({
        method: "GET",
        path: "/delegates/{id}",
        handler: handlers.show,
        options: {
            validate: schemas.show,
        },
    });

    server.route({
        method: "GET",
        path: "/delegates/{id}/blocks",
        handler: handlers.blocks,
        options: {
            validate: schemas.blocks,
        },
    });

    server.route({
        method: "GET",
        path: "/delegates/{id}/voters",
        handler: handlers.voters,
        options: {
            validate: schemas.voters,
        },
    });

    server.route({
        method: "GET",
        path: "/delegates/{id}/voters/balances",
        handler: handlers.voterBalances,
        options: {
            validate: schemas.voterBalances,
        },
    });
}
