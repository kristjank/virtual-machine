import { IServer } from "../../interfaces";
import * as handlers from "./handlers";
import * as schemas from "./schemas";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/votes",
        handler: handlers.index,
        options: {
            validate: schemas.index,
        },
    });

    server.route({
        method: "GET",
        path: "/votes/{id}",
        handler: handlers.show,
        options: {
            validate: schemas.show,
        },
    });
}
