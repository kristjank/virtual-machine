import { Container } from "@arkecosystem/core-interfaces";
import { defaults } from "./defaults";
import { Server } from "./server";

export const plugin: Container.PluginDescriptor = {
    pkg: require("../package.json"),
    defaults,
    alias: "json:api",
    async register(_, options) {
        const server = new Server(options);
        await server.start();

        return server;
    },
    async deregister(container: Container.IContainer) {
        return container.resolvePlugin<Server>("api").stop();
    },
};
