import { IServer } from "../../interfaces";
import * as handlers from "./handlers";
import * as schemas from "./schemas";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/blocks",
        handler: handlers.index,
        options: {
            plugins: {
                validator: schemas.index,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/blocks/{id}",
        handler: handlers.show,
        options: {
            plugins: {
                validator: schemas.show,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/blocks/{id}/transactions",
        handler: handlers.transactions,
        options: {
            plugins: {
                validator: schemas.transactions,
            },
        },
    });
}
