import { IServer } from "../../interfaces";
import * as handlers from "./handlers";
import * as schemas from "./schemas";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/blocks",
        handler: handlers.index,
        options: {
            validate: schemas.index,
        },
    });

    server.route({
        method: "GET",
        path: "/blocks/{id}",
        handler: handlers.show,
        options: {
            validate: schemas.show,
        },
    });

    server.route({
        method: "GET",
        path: "/blocks/{id}/transactions",
        handler: handlers.transactions,
        options: {
            validate: schemas.transactions,
        },
    });
}
