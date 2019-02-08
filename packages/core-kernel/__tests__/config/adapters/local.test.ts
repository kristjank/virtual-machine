import "jest-extended";

import { resolve } from "path";
import { LocalAdapter } from "../../../src/config/adapters";
import { BaseAdapter } from "../../../src/config/adapters/base";
import { Kernel } from "../../../src/contracts";
import { InvalidApplicationConfiguration, InvalidEnvironmentConfiguration } from "../../../src/errors";
import { createApp } from "../../__support__";

const config = {
    env: "unitnet",
    version: "2.1.0",
    token: "ark",
    network: "unitnet",
    paths: {
        data: resolve(__dirname, "../../__fixtures__/data"),
        config: resolve(__dirname, "../../__fixtures__/config-corrupted"),
        cache: resolve(__dirname, "../../__fixtures__/cache"),
        log: resolve(__dirname, "../../__fixtures__/log"),
        temp: resolve(__dirname, "../../__fixtures__/temp"),
    },
};

let app: Kernel.IApplication;
let adapter: BaseAdapter;

beforeEach(async () => {
    app = await createApp();
    adapter = new LocalAdapter(app);
});

describe("LocalAdapter", () => {
    it("should load the application configuration", () => {
        expect(app.network()).toBe("unitnet");
    });

    it("should throw an error if the application configuration is corrupted", async () => {
        app = await createApp(config);

        await expect(adapter.loadConfiguration()).rejects.toThrow(InvalidApplicationConfiguration);
    });

    it("should load the environment configuration", () => {
        expect(process.env.APP_KEY).toBe("value");
    });

    it("should throw an error if the environment configuration is corrupted", async () => {
        app = await createApp(config);

        await expect(adapter.loadEnvironmentVariables()).rejects.toThrow(InvalidEnvironmentConfiguration);
    });
});
