import "jest-extended";

import { resolve } from "path";
import { Application } from "../../../src/application";
import { LocalAdapter } from "../../../src/config/adapters";
import { BaseAdapter } from "../../../src/config/adapters/base";
import { Kernel } from "../../../src/contracts";
import { InvalidApplicationConfiguration, InvalidEnvironmentConfiguration } from "../../../src/errors";
import { createApp } from "../../__support__";

const configTest = {
    env: "test",
    version: "2.1.0",
    token: "ark",
    network: "testnet",
    paths: {
        data: resolve(__dirname, "../../__fixtures__/data"),
        config: resolve(__dirname, "../../__fixtures__/config"),
        cache: resolve(__dirname, "../../__fixtures__/cache"),
        log: resolve(__dirname, "../../__fixtures__/log"),
        temp: resolve(__dirname, "../../__fixtures__/temp"),
    },
};

const configGood = {
    env: "unitnet",
    version: "2.1.0",
    token: "ark",
    network: "unitnet",
    paths: {
        data: resolve(__dirname, "../../__fixtures__/data"),
        config: resolve(__dirname, "../../__fixtures__/config"),
        cache: resolve(__dirname, "../../__fixtures__/cache"),
        log: resolve(__dirname, "../../__fixtures__/log"),
        temp: resolve(__dirname, "../../__fixtures__/temp"),
    },
};

const configBad = {
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

describe("LocalAdapter", () => {
    it("should not load the environment variables if running tests", async () => {
        const app: Kernel.IApplication = await createApp(configTest, false);

        await new LocalAdapter(app).loadEnvironmentVariables();

        expect(process.env.APP_KEY).toBeUndefined();
    });

    it("should load the application configuration", async () => {
        const app: Kernel.IApplication = await createApp(configGood, false);

        await new LocalAdapter(app).loadConfiguration();

        expect(app.network()).toBe("unitnet");
    });

    it("should throw an error if the application configuration is corrupted", async () => {
        const app: Kernel.IApplication = await createApp(configBad, false);

        await expect(new LocalAdapter(app).loadConfiguration()).rejects.toThrow(InvalidApplicationConfiguration);
    });

    it("should load the environment configuration", async () => {
        const app: Kernel.IApplication = await createApp(configGood, false);

        await new LocalAdapter(app).loadEnvironmentVariables();

        expect(process.env.APP_KEY).toBe("value");
    });

    it("should throw an error if the environment configuration is corrupted", async () => {
        const app: Kernel.IApplication = await createApp(configBad, false);

        await expect(new LocalAdapter(app).loadEnvironmentVariables()).rejects.toThrow(InvalidEnvironmentConfiguration);
    });
});
