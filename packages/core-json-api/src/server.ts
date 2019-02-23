import { createServer, mountServer } from "@arkecosystem/core-http-utils";
import { IServer } from "./interfaces";

export class Server {
    private http: IServer;
    private https: IServer;

    public constructor(private readonly config: any) {}

    public async start(): Promise<void> {
        const options = {
            host: this.config.host,
            port: this.config.port,
        };

        // if (this.config.enabled) {
        this.http = await createServer(options);

        this.mountServer("HTTP", this.http);
        // }

        // if (this.config.ssl.enabled) {
        //     this.https = await createSecureServer(options, null, this.config.ssl);

        //     this.mountServer("HTTPS", this.https);
        // }
    }

    public async stop(): Promise<void> {
        if (this.http) {
            await this.http.stop();
        }

        if (this.https) {
            await this.https.stop();
        }
    }

    public async restart(): Promise<void> {
        if (this.http) {
            await this.http.stop();
            await this.http.start();
        }

        if (this.https) {
            await this.https.stop();
            await this.https.start();
        }
    }

    public instance(type: string): IServer {
        return this[type];
    }

    private async mountServer(name: string, server: IServer): Promise<void> {
        // await server.register({
        //     plugin: require("./plugins/media-type-enforcer"),
        // });

        await server.register({
            plugin: require("./plugins/query-string-parser"),
        });

        await server.register({
            plugin: require("./plugins/validator"),
        });

        await server.register({
            plugin: require("./plugins/error-serializer"),
        });

        await server.register({
            plugin: require("./plugins/response-serializer"),
        });

        await server.register({
            plugin: require("./modules"),
        });

        await mountServer(`Public ${name.toUpperCase()} API`, server);
    }
}
