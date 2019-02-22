import { IServer } from "../../interfaces";
import * as handlers from "./handlers";
import * as schemas from "./schemas";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/peers",
        handler: handlers.index,
        options: {
            validate: schemas.index,
        },
    });

    server.route({
        method: "GET",
        path: "/peers/suspended",
        handler: handlers.suspended,
    });

    server.route({
        method: "GET",
        path: "/peers/{ip}",
        handler: handlers.show,
        options: {
            validate: schemas.show,
        },
    });
}
