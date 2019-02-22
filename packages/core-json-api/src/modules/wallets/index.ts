import { IServer } from "../../interfaces";
import * as handlers from "./handlers";
import * as schemas from "./schemas";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/wallets",
        handler: handlers.index,
        options: {
            plugins: {
                "hapi-ajv": schemas.index,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/top",
        handler: handlers.top,
        options: {
            plugins: {
                "hapi-ajv": schemas.index,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}",
        handler: handlers.show,
        options: {
            plugins: {
                "hapi-ajv": schemas.show,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/transactions",
        handler: handlers.transactions,
        options: {
            plugins: {
                "hapi-ajv": schemas.transactions,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/transactions/sent",
        handler: handlers.transactionsSent,
        options: {
            plugins: {
                "hapi-ajv": schemas.transactionsSent,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/transactions/received",
        handler: handlers.transactionsReceived,
        options: {
            plugins: {
                "hapi-ajv": schemas.transactionsReceived,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/votes",
        handler: handlers.votes,
        options: {
            plugins: {
                "hapi-ajv": schemas.votes,
            },
        },
    });
}
