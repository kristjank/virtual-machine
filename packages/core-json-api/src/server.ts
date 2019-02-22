import { createSecureServer, createServer, mountServer } from "@arkecosystem/core-http-utils";
import Hapi from "hapi";
import { IRequest, IResponse, IServer } from "./interfaces";

export class Server {
    private http: IServer;
    private https: IServer;

    public constructor(private readonly config: any) {}

    public async start(): Promise<void> {
        const options = {
            host: this.config.host,
            port: this.config.port,
            routes: {
                cors: {
                    additionalHeaders: ["api-version"],
                },
                validate: {
                    async failAction(request: IRequest, h: IResponse, err: Error) {
                        throw err;
                    },
                },
            },
        };

        if (this.config.enabled) {
            this.http = await createServer(options);

            this.mountServer("HTTP", this.http);
        }

        if (this.config.ssl.enabled) {
            this.https = await createSecureServer(options, null, this.config.ssl);

            this.mountServer("HTTPS", this.https);
        }
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
        await mountServer(`Public ${name.toUpperCase()} API`, server);
    }
}
