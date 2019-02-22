import { IServer } from "../../interfaces";
import * as handlers from "./handlers";
import * as schemas from "./schemas";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/wallets",
        handler: handlers.index,
        options: {
            validate: schemas.index,
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/top",
        handler: handlers.top,
        options: {
            validate: schemas.index,
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}",
        handler: handlers.show,
        options: {
            validate: schemas.show,
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/transactions",
        handler: handlers.transactions,
        options: {
            validate: schemas.transactions,
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/transactions/sent",
        handler: handlers.transactionsSent,
        options: {
            validate: schemas.transactionsSent,
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/transactions/received",
        handler: handlers.transactionsReceived,
        options: {
            validate: schemas.transactionsReceived,
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/votes",
        handler: handlers.votes,
        options: {
            validate: schemas.votes,
        },
    });
}
