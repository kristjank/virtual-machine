import { resolve } from "path";
import { Application } from "../../src/application";
import { Kernel } from "../../src/contracts";

export async function createApp(
    config?: Record<string, any>,
    shouldBoot: boolean = true,
): Promise<Kernel.IApplication> {
    const defaults = {
        env: "unitnet",
        version: "2.1.0",
        token: "ark",
        network: "unitnet",
        paths: {
            data: resolve(__dirname, "../__fixtures__/data"),
            config: resolve(__dirname, "../__fixtures__/config"),
            cache: resolve(__dirname, "../__fixtures__/cache"),
            log: resolve(__dirname, "../__fixtures__/log"),
            temp: resolve(__dirname, "../__fixtures__/temp"),
        },
    };

    if (!config) {
        config = defaults;
    }

    const app: Kernel.IApplication = new Application();
    app.bootstrap(config);

    if (shouldBoot) {
        await app.boot();
    }

    return app;
}
