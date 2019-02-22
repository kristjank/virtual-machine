import { IServer } from "../../interfaces";
import * as handlers from "./handlers";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/node/status",
        handler: handlers.status,
    });

    server.route({
        method: "GET",
        path: "/node/syncing",
        handler: handlers.syncing,
    });

    server.route({
        method: "GET",
        path: "/node/configuration",
        handler: handlers.configuration,
    });
}
