import { IServer } from "../../interfaces";
import * as handlers from "./handlers";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/blockchain",
        handler: handlers.index,
    });
}
