import { resolve } from "path";
import { Application } from "../../src/application";

export function createApp() {
    const config = {
        env: "dummy",
        version: "2.1.0",
        token: "ark",
        network: "dummy",
        paths: {
            data: resolve(__dirname, "../__fixtures__/data"),
            config: resolve(__dirname, "../__fixtures__/config"),
            cache: resolve(__dirname, "../__fixtures__/cache"),
            log: resolve(__dirname, "../__fixtures__/log"),
            temp: resolve(__dirname, "../__fixtures__/temp"),
        },
    };

    const app: Application = new Application();
    app.bootstrap(config);

    return app;
}
