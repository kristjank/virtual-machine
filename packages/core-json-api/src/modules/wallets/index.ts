import { IServer } from "../../interfaces";
import { SerialiserType } from "../types";
import * as handlers from "./handlers";
import * as schemas from "./schemas";

export function register(server: IServer): void {
    server.route({
        method: "GET",
        path: "/wallets",
        handler: handlers.index,
        options: {
            plugins: {
                validator: schemas.index,
                serializer: SerialiserType.Wallet,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/top",
        handler: handlers.top,
        options: {
            plugins: {
                validator: schemas.index,
                serializer: SerialiserType.Wallet,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}",
        handler: handlers.show,
        options: {
            plugins: {
                validator: schemas.show,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/transactions",
        handler: handlers.transactions,
        options: {
            plugins: {
                validator: schemas.transactions,
                serializer: SerialiserType.Transaction,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/transactions/sent",
        handler: handlers.transactionsSent,
        options: {
            plugins: {
                validator: schemas.transactionsSent,
                serializer: SerialiserType.Transaction,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/transactions/received",
        handler: handlers.transactionsReceived,
        options: {
            plugins: {
                validator: schemas.transactionsReceived,
                serializer: SerialiserType.Transaction,
            },
        },
    });

    server.route({
        method: "GET",
        path: "/wallets/{id}/votes",
        handler: handlers.votes,
        options: {
            plugins: {
                validator: schemas.votes,
                serializer: SerialiserType.Transaction,
            },
        },
    });
}
